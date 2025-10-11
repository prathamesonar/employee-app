
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employees } = location.state || {};

  if (!employees || employees.length === 0) {
    return (
        <div className="page-container">
            <h2>No employee data available for chart.</h2>
            <button onClick={() => navigate('/list')}>Back to List</button>
        </div>
    );
  }
  
  const chartData = employees.slice(0, 10).map(emp => {
    const salaryStr = emp[5] || '0';
    const numericSalary = parseInt(salaryStr.replace(/[^\d.-]/g, ''), 10);
    
    return {
      name: emp[0],
      salary: numericSalary
    };
  });

  return (
    <div className="page-container chart-container">
      <h1>Employee Salaries (First 10)</h1>
      <ResponsiveContainer width="95%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="salary" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <button onClick={() => navigate('/list')} className="secondary">Back to List</button>
    </div>
  );
};

export default BarChartPage;
