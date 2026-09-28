import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Portfolio from './Portfolio'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="*" element={<Portfolio />} />
    </Routes>
  );
}

export default App;