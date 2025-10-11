// frontend/src/components/DetailsPage.jsx

import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const DetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employee } = location.state || {}; 

  if (!employee) {
    return (
      <div className="page-container">
        <h2>Employee not found</h2>
        <Link to="/list">Back to List</Link>
      </div>
    );
  }

  // --- FIX IS HERE: Improved function to parse the salary string ---
  const parseSalary = (salaryStr) => {
    if (typeof salaryStr !== 'string') return 0;
    // Use a regular expression to remove ALL non-digit characters
    const numericStr = salaryStr.replace(/[^\d.-]/g, '');
    return parseInt(numericStr, 10);
  };
  // --- END OF FIX ---

  return (
    <div className="page-container details-container">
      <h1>Employee Details</h1>
      <div className="details-card">
        <p><strong>ID:</strong> {employee[3]}</p>
        <p><strong>Name:</strong> {employee[0]}</p>
        <p><strong>Position:</strong> {employee[1]}</p>
        <p><strong>City:</strong> {employee[2]}</p>
        <p><strong>Start Date:</strong> {employee[4]}</p>
        <p><strong>Salary:</strong> ${parseSalary(employee[5]).toLocaleString()}</p>
      </div>
      <div className="action-buttons">
        <button onClick={() => navigate('/camera')}>Capture Photo</button>
        <button onClick={() => navigate('/list')} className="secondary">Back to List</button>
      </div>
    </div>
  );
};

export default DetailsPage;