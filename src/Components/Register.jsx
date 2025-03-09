import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';
import './css/LoginRegister.css';

const Register = () => {        
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
    const navigate = useNavigate();
    const [termsChecked, setTermsChecked] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!termsChecked) {
            setError('You must agree to the terms and conditions');
            alert(error);
            return;
        }

        const phoneRegex = /^[0-9]{11}$/;
        if (!phoneRegex.test(regisFormData.phone_num)) {
            setError('Phone number must be 11 digits');
            alert(error);
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
            alert('Successfully Registered!');

            setTimeout(() => {
                navigate('/login');
            }, 1000);

        } catch (err) {
            setError(err.message);
        }
    };

    const handleChangeRegister = (e) => {
        setRegisFormData({
            ...regisFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleTermsCheckbox = (e) => {
        setTermsChecked(e.target.checked); 
    };

    return (
        <div className='wrapper'>
        
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
                            required
                        />
                        <FaEnvelope className='icon' />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            name="password"
                            placeholder='Password'
                            value={regisFormData.password}
                            onChange={handleChangeRegister}
                            required
                        />
                        <FaLock className='icon' />
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            name="firstname"
                            placeholder='Firstname'
                            value={regisFormData.firstname}
                            onChange={handleChangeRegister}
                            required
                        />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            name="middlename"
                            placeholder='Middlename'
                            value={regisFormData.middlename}
                            onChange={handleChangeRegister}
                        />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            name="lastname"
                            placeholder='Lastname'
                            value={regisFormData.lastname}
                            onChange={handleChangeRegister}
                            required
                        />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            name="phone_num"
                            placeholder='Phone Number'
                            value={regisFormData.phone_num}
                            onChange={handleChangeRegister}
                            required
                        />
                        <FaPhone className='icon' />
                    </div>

                    <div className="remember-forgot">
                        <label><input 
                            type="checkbox" 
                            checked={termsChecked}
                            onChange={handleTermsCheckbox} />
                                I agree to the terms & conditions
                        </label>
                    </div>

                    <button type="submit">Register</button>

                    <div className="login-link">
                        <p>Already have an account?</p>
                        <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;