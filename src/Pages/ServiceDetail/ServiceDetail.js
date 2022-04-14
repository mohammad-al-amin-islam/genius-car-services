import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate()
    return (
        <div>
            <h1>Service details of: {serviceId}</h1>
            <button onClick={() => navigate('/checkout')}>CheckOut</button>
        </div>
    );
};

export default ServiceDetail;