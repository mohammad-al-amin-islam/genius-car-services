import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import axiosPrivate from '../../api/axiosPrivate'
const Order = () => {
    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);
    const email = user?.email;
    const navigate = useNavigate();
    useEffect(() => {
        const getOrder = async () => {
            const url = `https://infinite-bayou-64300.herokuapp.com/order?email=${email}`
            try {
                const { data } = await axiosPrivate.get(url)
                //  {
                //     headers: {
                //         authorization: `Bearer ${localStorage.getItem('accessToken')}`
                //     }
                // });
                setOrders(data);
            }
            catch (error) {
                console.log(error.message);
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth);
                    navigate('/login');
                }
            }
        }
        getOrder();
    }, [email]);
    return (
        <div className='w-50 mx-auto'>
            <h4>Total Order : {orders.length}</h4>
            {
                orders.map(order => <div key={order._id}>
                    {order.email}:{order.service}
                </div>)
            }
        </div>
    );
};

export default Order;