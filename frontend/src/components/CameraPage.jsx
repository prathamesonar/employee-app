// src/components/CameraPage.js
import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

const CameraPage = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const capture = useCallback(() => {
    // getScreenshot returns a base64 encoded image string
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      // Pass the captured image to the photo result page
      navigate('/photo', { state: { image: imageSrc } });
    }
  }, [webcamRef, navigate]);
  
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  return (
    <div className="page-container camera-container">
      <h1>Capture Photo</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="webcam"
      />
      <button onClick={capture}>Capture photo</button>
    </div>
  );
};

export default CameraPage;