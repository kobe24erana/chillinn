import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import './css/LoginRegister.css';

const Login = () => {        
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            console.log('in login');

            const response = await fetch('https://eminent-chalk-lotus.glitch.me/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginFormData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            navigate('/userprofile');

            setSuccess(data.message);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleChangeLogin = (e) => {
        setLoginFormData({
            ...loginFormData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className='wrapper'>
            <div className='form-box login'>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input
                            type="email"
                            name="email"
                            placeholder='Email'
                            value={loginFormData.email}
                            onChange={handleChangeLogin}
                            required
                        />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            name="password"
                            placeholder='Password'
                            value={loginFormData.password}
                            onChange={handleChangeLogin}
                            required
                        />
                        <FaLock className='icon' />
                    </div>

                    {/* <div className="remember-forgot">
                        <label><input type="checkbox" />Remember me</label>
                        <a href="/forgot-password">Forgot password?</a>
                    </div> */}

                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>Don't have an account?</p>
                        <Link to="/register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;