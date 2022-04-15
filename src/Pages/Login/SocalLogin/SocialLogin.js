import React from 'react';
import google from '../../../images/SocialLogo/google.png'
import facebook from '../../../images/SocialLogo/facebook.png'
import github from '../../../images/SocialLogo/github.png'
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const SocialLogin = () => {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, userGit, loadingGit, errorGit] = useSignInWithGithub(auth);
    const navigate = useNavigate();

    if (loading || loadingGit) {
        return <Loading></Loading>
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle();
    }
    if (user || userGit) {
        navigate('/home');
    }
    let getError;

    if (error || errorGit) {
        getError = <p>{error?.message} {errorGit?.message}</p>
    }

    return (
        <div>
            <div className='d-flex  align-items-center'>
                <div style={{ height: '1px' }} className='w-50 bg-primary '></div>
                <p className='mt-3 px-3'>or</p>
                <div style={{ height: '1px' }} className='w-50 bg-primary '></div>
            </div>
            {getError}
            <div>
                <button onClick={handleGoogleSignIn} className='btn btn-success text-white w-50 d-block mx-auto mb-3'>
                    <img height='40px' src={google} alt="" />
                    <span className='ms-2'>Google Sign In</span>
                </button>
                <button className='btn btn-success text-white w-50 d-block mx-auto mb-3'>
                    <img height='40px' src={facebook} alt="" />
                    <span className='ms-2'>Facebbok Sign In</span>
                </button>
                <button onClick={() => signInWithGithub()} className='btn btn-success text-white w-50 d-block mx-auto'>
                    <img src={github} alt="" />
                    <span className='ms-2'>Github Sign In</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;