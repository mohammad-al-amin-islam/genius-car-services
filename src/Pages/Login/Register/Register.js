import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import './Register.css'
import auth from '../../../firebase.init';
import SocialLogin from '../SocalLogin/SocialLogin';

const Register = () => {
    const navigate = useNavigate();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    if (user) {
        navigate('/home');
    }
    const handleSubmit = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        createUserWithEmailAndPassword(email, password);
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
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;