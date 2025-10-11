// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';

import LoginPage from './components/LoginPage';
import ListPage from './components/ListPage';
import DetailsPage from './components/DetailsPage';
import BarChartPage from './components/BarChartPage';
import MapPage from './components/MapPage';
import CameraPage from './components/CameraPage';
import PhotoResultPage from './components/PhotoResultPage';
import ProtectedRoute from './components/ProtectedRoute';
import PieChartPage from './components/PieChartPage'; // Import new page
import Navbar from './components/Navbar'; // Import Navbar

import './App.css';
import 'leaflet/dist/leaflet.css';
// import 'react-leaflet-cluster/lib/styles.scss';

// Layout for pages that should have the Navbar
const ProtectedLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<LoginPage />} />

            {/* Protected Routes with Navbar */}
            <Route path="/list" element={<ProtectedRoute><ProtectedLayout><ListPage /></ProtectedLayout></ProtectedRoute>} />
            <Route path="/details/:id" element={<ProtectedRoute><ProtectedLayout><DetailsPage /></ProtectedLayout></ProtectedRoute>} />
            <Route path="/chart" element={<ProtectedRoute><ProtectedLayout><BarChartPage /></ProtectedLayout></ProtectedRoute>} />
            <Route path="/map" element={<ProtectedRoute><ProtectedLayout><MapPage /></ProtectedLayout></ProtectedRoute>} />
            <Route path="/pie-chart" element={<ProtectedRoute><ProtectedLayout><PieChartPage /></ProtectedLayout></ProtectedRoute>} />
            <Route path="/camera" element={<ProtectedRoute><ProtectedLayout><CameraPage /></ProtectedLayout></ProtectedRoute>} />
            <Route path="/photo" element={<ProtectedRoute><ProtectedLayout><PhotoResultPage /></ProtectedLayout></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;