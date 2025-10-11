// frontend/src/components/MapPage.jsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// This fix points the map icons to the files in your /public folder.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
});

// --- THIS IS THE COMPLETE LIST OF REQUIRED CITIES ---
const cityCoordinates = {
  // North America
  "New York": [40.7128, -74.0060],
  "Los Angeles": [34.0522, -118.2437],
  "Chicago": [41.8781, -87.6298],
  "Houston": [29.7604, -95.3698],
  "Phoenix": [33.4484, -112.0740],
  "San Francisco": [37.7749, -122.4194],
  "Philadelphia": [39.9526, -75.1652],
  "Dallas": [32.7767, -96.7970],
  
  // Europe
  "London": [51.5072, -0.1276],
  "Paris": [48.8566, 2.3522],
  "Edinburgh": [55.9533, -3.1883],
  "Madrid": [40.4168, -3.7038],
  "Rome": [41.9028, 12.4964],
  "Berlin": [52.5200, 13.4050],

  // Asia
  "Tokyo": [35.6895, 139.6917],
  "Singapore": [1.3521, 103.8198],
  "Hong Kong": [22.3193, 114.1694],
  "Dubai": [25.2048, 55.2708],
  "Mumbai": [19.0760, 72.8777],
  
  // South America & Australia
  "Sydney": [-33.8688, 151.2093],
  "Sao Paulo": [-23.5505, -46.6333],
};


const MapPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employees } = location.state || {};

  if (!employees) {
    return <div className="page-container">Loading map data...</div>;
  }
  
  // This will now find coordinates for every city in the dataset.
  const employeesWithCoords = employees
    .map(emp => ({
      ...emp,
      coords: cityCoordinates[emp[2]] // Index 2 is City
    }))
    .filter(emp => emp && emp.coords); // Filter out any that are still not found

  return (
    <div className="page-container map-container">
        <h1>Employee City Map 🗺️</h1>
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '600px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Create a marker for each employee with coordinates */}
            {employeesWithCoords.map((emp, index) => (
                <Marker key={`marker-${emp[3]}-${index}`} position={emp.coords}>
                <Popup>
                    <strong>{emp[0]}</strong><br />
                    {emp[2]}
                </Popup>
                </Marker>
            ))}
        </MapContainer>
        <button onClick={() => navigate('/list')} className="secondary">Back to List</button>
    </div>
  );
};

export default MapPage;