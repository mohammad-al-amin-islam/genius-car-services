import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState({});
    useEffect(() => {
        const url = `http://localhost:5000/service/${serviceId}`
        fetch(url)
            .then(res => res.json())
            .then(data => setService(data))
    }, [serviceId]);
    return (
        <div>
            <h1>Service details of: {service.name}</h1>
            <button onClick={() => navigate('/checkout')}>CheckOut</button>
        </div>
    );
};

export default ServiceDetail;