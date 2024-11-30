import React, { useRef, useEffect } from "react";
import { properties } from '../../properties';
import axios from "axios";

const CameraAccess = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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
        processFrame();
    }, 10000);

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
    
    
  }, []);

  const processFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;

    const context = canvas.getContext("2d");
    const originalWidth = video.videoWidth;
    const originalHeight = video.videoHeight;

    // Set desired size for resizing
    const width = originalWidth * 0.25; // Desired width
    const height = originalHeight * 0.25; // Desired height
    canvas.width = width;
    canvas.height = height;

    // Draw the video frame to the canvas
    context.drawImage(videoRef.current, 0, 0, width, height);

    // Get the image data (RGB pixel values)
    const imageData = context.getImageData(0, 0, width, height);
    console.log("RGB Data:", imageData.data); // imageData.data contains the RGB values in a flat array

    canvas.toBlob(async (blob) => {
        if (blob) {
          // Prepare form data to send
          const formData = new FormData();
          formData.append("frame", blob, "frame");

          try {
            // Send the blob as a file via Axios
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
      <div>
        <video ref={videoRef} autoPlay style={{ display: "none" }} />
        <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
        <button onClick={processFrame}>Process Frame</button>
      </div>
    );
  };

export default CameraAccess;
