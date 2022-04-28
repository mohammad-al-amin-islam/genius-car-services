import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const AddService = () => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log(data);
        fetch('https://infinite-bayou-64300.herokuapp.com/serviceadd', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                navigate('/home');
            })
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Add Services here</h2>
            <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <input className='mb-2' placeholder='Name' {...register("name", { required: true, maxLength: 20 })} />
                <textarea className='mb-2' placeholder='Description' {...register("desciption")} />

                <input className='mb-2' placeholder='Price' type="number" {...register("price")} />
                <input className='mb-2' placeholder='Photo URL' type="text" {...register("img")} />
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddService;