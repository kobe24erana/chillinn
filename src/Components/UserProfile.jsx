import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/UserProfile.css';

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('wala tokin');
                    throw new Error('No token found. Please log in.');
                }
                console.log(token);

                const response = await fetch('https://eminent-chalk-lotus.glitch.me/users/userinfobyemail', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user information');
                }

                const data = await response.json();
                setUserInfo(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="wrapper">
            <div className="user-profile">
                <h1>User Profile</h1>
                {userInfo ? (
                    <div className="profile-info">
                        <p><strong>Email:</strong> {userInfo.email}</p>
                        <p><strong>First Name:</strong> {userInfo.firstname}</p>
                        <p><strong>Middle Name:</strong> {userInfo.middlename}</p>
                        <p><strong>Last Name:</strong> {userInfo.lastname}</p>
                        <p><strong>Phone Number:</strong> {userInfo.phone_num}</p>
                        <p><strong>Role:</strong> {userInfo.role}</p>
                        <p><strong>Account Created:</strong> {userInfo.created}</p>
                    </div>
                ) : (
                    <p>No user information available.</p>
                )}

                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </div>
        
    );
};

export default UserProfile;