'use client';

import { BiShowAlt, BiSolidHide } from "react-icons/bi";
import { useForm } from "react-hook-form";
import React, { useState } from 'react'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/navigation";

const page = () => {
    const [active, setActive] = useState();
    const router = useRouter();

    const Show = () => {
        setActive(!active);
    }



    const handleSubmitData = async (data) => {
        const inputElement = document.querySelectorAll('input').forEach((ele) => {
            ele.value = '';
        });
        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        })

        if (res.ok) {
            alert('account register')
            router.push('/login')
        }


    }



    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema),
    });


    return (
        <>
            <div className="container-1">

                <form onSubmit={handleSubmit(handleSubmitData)} method="POST" className='form-sign'>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Username
                        </label>
                        <input type='name' placeholder='enter username here...' {...register("name")} />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Email
                        </label>
                        <input type='email' placeholder='enter email here...' {...register("email")} />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>


                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Password
                        </label>
                        <input type={active ? 'text' : 'password'} placeholder='enter password here...' {...register("password")} />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        <div className={`${active ? 'hidden' : 'block'} absolute top-10 right-2 text-2xl cursor-pointer`} onClick={() => Show()}><BiSolidHide /></div>
                        <div className={`${active ? 'block' : 'hidden'} absolute top-10 right-2 text-2xl cursor-pointer`} onClick={() => Show()}><BiShowAlt /></div>
                    </div>

                    <div className="flex items-center justify-between my-3" >
                        <button
                            className="btn"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>


                </form>
            </div>
        </>
    );
};

export default page;


