import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import auth from '../../../firebase.init';
import useServiceDetail from '../../../hooks/useServiceDetail';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const { serviceId } = useParams()
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);
    // const [user, setUser] = useState({
    //     name: 'omukh khan',
    //     email: 'omukh@khan',
    //     address: 'mirpur',
    //     phone: '0171111111'
    // });
    // const handleAddress = event => {
    //     const { address, ...rest } = user;
    //     console.log(address, rest);
    //     const newAddress = event.target.value;
    //     const newUser = { address: newAddress, ...rest }
    //     setUser(newUser);
    //     console.log(newUser);
    // }

    const handleFromSubmit = event => {
        event.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value

        }
        axios.post('http://localhost:5000/order', order)
            .then(response => {
                console.log(response);
                const { data } = response;
                if (data.insertedId) {
                    toast('Order has been placed');
                    event.target.reset();
                }
            })
    }
    return (
        <div className='w-50 mx-auto'>
            <h3>Order placed:{service.name}</h3>
            <form onSubmit={handleFromSubmit}>
                <input className='w-100 mb-3' type="text" name="name" value={user?.displayName} placeholder="name" required readOnly disabled />
                <br />
                <input className='w-100 mb-3' type="text" name="email" value={user?.email} placeholder="email" required readOnly disabled />
                <br />
                <input className='w-100 mb-3' type="text" name="service" value={service.name} placeholder="service" required />
                <br />
                <input className='w-100 mb-3' type="text" name="address" placeholder="address" required autoComplete='off' />
                <br />
                {/* <input className='w-100 mb-3' type="text" name="address" value={user.address} onChange={handleAddress} placeholder="address" required />
                <br /> */}
                <input className='w-100 mb-3' type="text" name="phone" placeholder="phone number" required />
                <br />

                <input type="submit" value="Place Order" />
            </form>
        </div>
    );
};

export default Checkout;