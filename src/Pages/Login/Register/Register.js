import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import './Register.css'
import auth from '../../../firebase.init';
import SocialLogin from '../SocalLogin/SocialLogin';
import Loading from '../../Shared/Loading/Loading';
import useToken from '../../../hooks/useToken';

const Register = () => {
    const navigate = useNavigate();
    const [agree, setAgree] = useState(false);


    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    //update profile
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [token] = useToken(user)

    if (loading || updating) {
        return <Loading></Loading>
    }
    if (token) {
        navigate('/home');
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
        console.log('updated');
        // navigate('/home');
    }
    //handle checked
    // const handleChecked = event => {
    //     setAgree(event.target.checked);
    // }

    return (
        <div className='register-from'>
            <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Please Register</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" id="" placeholder='Enter Your Name' />
                <input type="email" name="email" id="" placeholder='Enter your mail' required />
                <input type="password" name="password" placeholder='Enter Your password' id="" required />
                <input onClick={() => setAgree(!agree)} type="checkbox" name="terms" id="terms" />
                <label className={`ms-2 ${agree ? 'text-primary' : ''}`} htmlFor="terms">Accept Genius Car terms and condition</label>
                {/* <label className={agree ? 'text-primary' : 'text-danger'} htmlFor="terms">Accept Genius Car terms and condition</label> */}
                <input className='mx-auto btn btn-primary w-50 mt-2' disabled={!agree} type="submit" value="Register" />
            </form>
            <p className='text-center'>Already have an account?<span onClick={() => navigate('/login')} className='text-primary' style={{ cursor: 'pointer' }}>Please Login</span></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;