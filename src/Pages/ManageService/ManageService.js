import React from 'react';
import useServices from '../../hooks/useServices';

const ManageService = () => {
    const [services, setServices] = useServices();
    const handleDelete = id => {
        const procced = window.confirm();
        if (procced) {
            const url = `https://infinite-bayou-64300.herokuapp.com/manageservice/${id}`
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    const remaining = services.filter(service => service._id !== id);
                    setServices(remaining);
                });
        }
    }
    return (
        <div className='w-50 mx-auto'>
            <h3>This is manage service</h3>
            {
                services.map(service => <div key={service._id}>
                    <h3>{service.name}<button onClick={() => handleDelete(service._id)}>X</button></h3>
                </div>)
            }
        </div>
    );
};

export default ManageService;