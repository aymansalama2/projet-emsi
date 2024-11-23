import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Signup from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import Login from './pages/SignIn';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
    return (
        <Router>
            <Navbar />

            <Routes>
            <Route path="/admin" element={<AdminDashboard />} />

            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}
