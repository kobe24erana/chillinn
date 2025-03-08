import React, { useState } from 'react'
import './LoginRegister.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const LoginRegister = () => {
    const [action, setAction] = useState('');

    const registerLink = (e) => {
        e.preventDefault();
        setAction('active');
    };

    const loginLink = (e) => {
        e.preventDefault();
        setAction('');
    };

    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });
    const [regisFormData, setRegisFormData] = useState({
        email: '',
        password: '',
        firstname: '',
        middlename: '',
        lastname: '',
        phone_num: '',
        role: 0
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


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

            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            setSuccess(data.message);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const phoneRegex = /^[0-9]{11}$/;
        if (!phoneRegex.test(regisFormData.phone_num)) {
            setError('Phone number must be 11 digits');
            return;
        }

        try {
            console.log('in regis');

            const response = await fetch('https://eminent-chalk-lotus.glitch.me/users/add-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(regisFormData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Register failed');
            }

            localStorage.setItem('user', JSON.stringify(data.user));
            
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

    const handleChangeRegister = (e) => {
        setRegisFormData({
        ...regisFormData,
        [e.target.name]: e.target.value
      });
    };

    return (
        <div className={`wrapper ${action}`}>
            {/* Login Form */}
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
                        required />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input 
                        type="password" 
                        name="password"
                        placeholder='Password' 
                        value={loginFormData.password} 
                        onChange={handleChangeLogin}
                        required />
                        <FaLock className='icon' />
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember me</label>
                        <a href="/forgot-password">Forgot password?</a>
                    </div>

                    <button type="submit">Login</button>

                    <div class="register-link">
                      <p>Don't have an account?</p>
                        <a href="Register" onClick={registerLink}>Register</a>
                    </div>

                </form>
            </div>

            {/* Registration Form */}
            <div className='form-box register'>
                <form onSubmit={handleRegister}>
                    <h1>Sign up</h1>
                    <div className="input-box">
                        <input 
                        type="email"
                        name="email" 
                        placeholder='Email' 
                        value={regisFormData.email} 
                        onChange={handleChangeRegister}
                        required />
                        <MdEmail className='icon' />
                    </div>
                    <div className="input-box">
                        <input 
                        type="password" 
                        name="password" 
                        placeholder='Password' 
                        value={regisFormData.password} 
                        onChange={handleChangeRegister}
                        required />
                        <FaLock className='icon' />
                    </div>

                    <div className="input-box">
                        <input 
                        type="text" 
                        name="firstname"
                        placeholder='Firstname'
                        value={regisFormData.firstname} 
                        onChange={handleChangeRegister} 
                        required />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input 
                        type="text" 
                        name="middlename"
                        placeholder='Middlename' 
                        value={regisFormData.middlename} 
                        onChange={handleChangeRegister}
                        notrequired />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input 
                        type="text" 
                        name="lastname"
                        placeholder='Lastname' 
                        value={regisFormData.lastname} 
                        onChange={handleChangeRegister}
                        required />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input 
                        type="text" 
                        name="phone_num"
                        placeholder='Phone Number' 
                        value={regisFormData.phone_num} 
                        onChange={handleChangeRegister}
                        required />
                        <FaUser className='icon' />
                    </div>                     

                    <div className="remember-forgot">
                        <label><input type="checkbox" />I agree to the terms & conditions</label>
                    </div>

                    <button type="submit">Register</button>

                    <div class="login-link">
                       <p>Already have an account?</p>
                          <a href="login" onClick={loginLink}>Login</a>
                      </div>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;
