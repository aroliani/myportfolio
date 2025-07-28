import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from './Portfolio'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/portfolio" />} />
      <Route path="/portfolio" element={<Portfolio />} />
    </Routes>
  );
}

export default App;