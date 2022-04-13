import React from 'react';
import ErrorImg from '../../../images/404-page-error.png'

const NotFound = () => {
    return (
        <div>
            <h2 className='text-primary text-center'>Opps</h2>
            <img className='w-100' src={ErrorImg} alt="" />
        </div>
    );
};

export default NotFound;