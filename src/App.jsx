import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Navbar from './pages/Navbar';

export default function App() {
    return (
        <Router>
            {/* La Navbar est rendue avant les Routes */}
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}
