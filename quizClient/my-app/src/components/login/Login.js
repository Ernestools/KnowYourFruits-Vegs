import React, { useRef, useEffect, useState } from "react";
import { properties } from '../../properties';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRecognized, setIsRecognized] = useState(false); 
  const [recognizedName, setRecognizedName] = useState(""); 
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);


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

    const interval = setInterval(() => {
      if (!isRecognized) {
        processFrame(); // Process frames until recognition
      }
    }, 2000); // Process frame every 2 seconds

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
      clearInterval(interval);
    };
  }, [isRecognized]); // Only run the interval if the user isn't recognized yet

  const processFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;

    const context = canvas.getContext("2d");
    const originalWidth = video.videoWidth;
    const originalHeight = video.videoHeight;

    // Set canvas size for resizing
    const width = originalWidth * 0.25; // Resize to 25%
    const height = originalHeight * 0.25;
    canvas.width = width;
    canvas.height = height;

    // Draw the video frame to the canvas
    context.drawImage(video, 0, 0, width, height);

    // Convert the canvas content into a blob and send it to the server
    canvas.toBlob(async (blob) => {
      if (blob) {
        const formData = new FormData();
        formData.append("frame", blob, "frame");

        try {
          const response = await axios.post(
            properties.DataServerBasePath + "/" + properties.RecognitionApi,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const { data } = response;
          console.warn(response);
          if (data.username == "" ) {
            console.log("Face not recognized. Trying again...");
          } else {
            console.log(`Welcome, ${data.username}!`);
            setRecognizedName(data.username);
            setIsRecognized(true);
            setShowAlert(true);
            if (videoRef.current && videoRef.current.srcObject) {
              const tracks = videoRef.current.srcObject.getTracks();
              tracks.forEach((track) => track.stop());
              videoRef.current.srcObject = null;
            }
          }
        } catch (error) {
          console.error("Error sending frame:", error);
        }
      }
    }, "image/png");
  };

  const handleAlertConfirmation = () => {
    navigate(`/quiz?username=${recognizedName}`);  
  }


  return (
    <div>
      <h1>Face Recognition Login</h1>
      <div>
        <video ref={videoRef} autoPlay style={{ width: "100%", maxWidth: "500px", border: "1px solid black" }} />
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {showAlert && (
                <div className="custom-alert">
                    <div className="alert-content">
                        <h2>{recognizedName}! Welcome Back</h2>
                        <button onClick={handleAlertConfirmation}>Start</button>
                    </div>
                </div>
            )}
    </div>
  );
};

export default Login;
