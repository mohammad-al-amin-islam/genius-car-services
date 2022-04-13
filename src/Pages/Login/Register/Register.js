import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        console.log(email, name, password);
    }
    return (
        <div className='register-from'>
            <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Please Register</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" id="" placeholder='Enter Your Name' />
                <input type="email" name="email" id="" placeholder='Enter your mail' required />
                <input type="password" name="password" placeholder='Enter Your password' id="" required />
                <input type="submit" value="Register" />
            </form>
            <p className='text-center'>Already have an account?<span onClick={() => navigate('/login')} className='text-primary' style={{ cursor: 'pointer' }}>Please Login</span></p>
        </div>
    );
};

export default Register;