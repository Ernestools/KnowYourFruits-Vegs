import React, { useRef, useEffect, useState } from "react";
import { properties } from '../../properties';
import axios from "axios";
import './Registration.css'

const Signup = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [username, setUsername] = useState("");
  const [isCaptureReady, setIsCaptureReady] = useState(false);

  const handleUserInput = (event) => {
    setUsername(event.target.value);
  };


  useEffect(() => {
    const getCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    };

    getCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
    
    
    }, []);

    const captureFrame = () => {

        if (!videoRef.current || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const video = videoRef.current;

        const context = canvas.getContext("2d");
        const originalWidth = video.videoWidth;
        const originalHeight = video.videoHeight;

        // const width = originalWidth * 0.25;
        // const height = originalHeight * 0.25;
        // canvas.width = width;
        // canvas.height = height;

        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        setIsCaptureReady(true);
    }

    const handleSubmit = () => {

    if (!canvasRef.current || !isCaptureReady || !username) 
        return;

    const canvas = canvasRef.current;
    canvas.toBlob(async (blob) => {
        if (blob) {
            const formData = new FormData();
            formData.append("frame", blob, "frame");
            formData.append("username", username);

            try {
            const response = await axios.post(properties.DataServerBasePath+'/'+properties.RecognitionApi, formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            });
            console.log("Frame sent successfully:", response.data);
            } catch (error) {
            console.error("Error sending frame:", error);
            }
        }
        }, "image/png");
    }

    return (
        <div className="container">
        <div className="media-container">
          <video ref={videoRef} autoPlay />
          <canvas ref={canvasRef} />
        </div>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleUserInput}
          placeholder="Enter your username"
        />
        <button onClick={captureFrame}>Take a Picture</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      
    );
};

export default Signup;