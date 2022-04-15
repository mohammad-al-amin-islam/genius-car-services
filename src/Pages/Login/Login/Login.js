import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import SocialLogin from '../SocalLogin/SocialLogin';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    if (user) {
        navigate(from, { replace: true });
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
    return (
        <div className="container w-50 mx-auto">
            <h1 className='text-center text-primary'>Please Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="my-3 " controlId="formBasicEmail">
                    <Form.Control className='p-3 ' ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3 " controlId="formBasicPassword">
                    <Form.Control className='p-3' ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button className='d-block mx-auto w-50' variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p>{getError}</p>
            <p className='text-center'>Dont have any account?<span onClick={() => navigate('/register')} className='text-primary' style={{ cursor: 'pointer' }}>Please Register</span></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;