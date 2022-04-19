import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import SocialLogin from '../SocalLogin/SocialLogin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from '../../Shared/PageTitle/PageTitle';
const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    if (user) {
        navigate(from, { replace: true });
    }

    if (loading || sending) {
        return <Loading></Loading>
    }

    let getError;

    if (error) {
        getError = <p>{error?.message}</p>
    }

    const handleSubmit = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        signInWithEmailAndPassword(email, password);
        console.log(email, password);
    }
    //for reset password
    const handleResetPaword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast('Sent email');
        }
        else {
            toast('Enter Email')
        }
    }
    return (
        <div className="container w-50 mx-auto">
            <PageTitle title='login'></PageTitle>
            <h1 className='text-center text-primary'>Please Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="my-3 " controlId="formBasicEmail">
                    <Form.Control className='p-3 ' ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3 " controlId="formBasicPassword">
                    <Form.Control className='p-3' ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>

                <Button className='d-block mx-auto w-50' variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p>{getError}</p>
            <p className='text-center'>Dont have any account?<span onClick={() => navigate('/register')} className='text-primary' style={{ cursor: 'pointer' }}>Please Register</span></p>
            <p className='text-center'>Forgot Password? <button onClick={handleResetPaword} className='btn btn-link'>Reset Here</button></p>
            <SocialLogin></SocialLogin>
            <ToastContainer />
        </div>
    );
};

export default Login;