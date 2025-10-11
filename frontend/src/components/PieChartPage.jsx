
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943', '#19D4FF'];

const PieChartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employees } = location.state || {};

  const cityData = useMemo(() => {
    if (!employees) return [];

    const cityCounts = employees.reduce((acc, emp) => {
      const city = emp[2]; // City is at index 2
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(cityCounts).map(city => ({
      name: city,
      value: cityCounts[city],
    }));
  }, [employees]);

  if (!employees || employees.length === 0) {
    return (
      <div className="page-container">
        <h2>No employee data available for chart.</h2>
        <button onClick={() => navigate('/list')}>Back to List</button>
      </div>
    );
  }

  return (
    <div className="page-container chart-container">
      <h1>Employee Distribution by City</h1>
      <ResponsiveContainer width="95%" height={400}>
        <PieChart>
          <Pie
            data={cityData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {cityData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <button onClick={() => navigate('/list')} className="secondary">Back to List</button>
    </div>
  );
};

export default PieChartPage;
