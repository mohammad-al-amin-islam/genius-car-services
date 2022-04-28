import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useServiceDetail from '../../hooks/useServiceDetail';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetail(serviceId);
    const navigate = useNavigate();

    return (
        <div className="w-50 mx-auto">
            <h1>Service details of: {service.name}</h1>
            <button onClick={() => navigate(`/checkout/${serviceId}`)}>CheckOut</button>
        </div>
    );
};

export default ServiceDetail;