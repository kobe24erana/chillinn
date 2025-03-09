import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import UserProfile from './Components/UserProfile';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/userprofile" element={<UserProfile />} />
                <Route path="/" element={<Login />} /> {/* Default route */}
            </Routes>
        </Router>
    );
};

export default App;
