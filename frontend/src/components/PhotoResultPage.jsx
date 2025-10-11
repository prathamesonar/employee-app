// src/components/PhotoResultPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PhotoResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { image } = location.state || {};

  if (!image) {
    return (
      <div className="page-container">
        <h2>No image captured.</h2>
        <button onClick={() => navigate('/camera')}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="page-container photo-result-container">
      <h1>Captured Photo</h1>
      <img src={image} alt="User Capture" className="captured-image"/>
      <button onClick={() => navigate('/list')}>Back to List</button>
    </div>
  );
};

export default PhotoResultPage;