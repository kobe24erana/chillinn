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

    return (
        <div className={`wrapper ${action}`}>
            {/* Login Form */}
            <div className='form-box login'>
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required />
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
                <form action="">
                    <h1>Sign up</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder='Email' required />
                        <MdEmail className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required />
                        <FaLock className='icon' />
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
