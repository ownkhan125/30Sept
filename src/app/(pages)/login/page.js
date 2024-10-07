'use client';

import { BiShowAlt, BiSolidHide } from "react-icons/bi";
import { useForm } from "react-hook-form";
import React, { useState } from 'react'
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
    const [active, setActive] = useState();
    const router = useRouter();

    const Show = () => {
        setActive(!active);
    }

    const { register, handleSubmit } = useForm();


    const handleSubmitData = async (data) => {
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data })
            })
            if (res.ok) {
                router.push('/dashboard')
            }
            else if (res.status) {
                alert('incorrect password')
            }

        } catch (error) {
            console.log(error.message);
        }
    }





    return (
        <>
            <div className="container-1">

                <form onSubmit={handleSubmit(handleSubmitData)} method="POST" className='form-sign'>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Email
                        </label>
                        <input required type='email' placeholder='enter email here...' {...register("email")} />

                    </div>


                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Password
                        </label>
                        <input required type={active ? 'text' : 'password'} placeholder='enter password here...' {...register("password")} />
                        <div className={`${active ? 'hidden' : 'block'} absolute top-10 right-2 text-2xl cursor-pointer`} onClick={() => Show()}><BiSolidHide /></div>
                        <div className={`${active ? 'block' : 'hidden'} absolute top-10 right-2 text-2xl cursor-pointer`} onClick={() => Show()}><BiShowAlt /></div>
                    </div>

                    <div className="flex items-center justify-between my-3" >
                        <button
                            className="btn"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="btn"
                            onClick={() => signIn("google", { callbackUrl: '/dashboard' })}
                        >
                            Login with Google
                        </button>
                    </div>

                    <div className="p-2">
                        <Link href={'/forgetpassword'}>< button className="text-blue-800 text-start underline underline-offset-1">Forget Password...?</button></Link>
                    </div>

                </form>
            </div>
        </>
    );
};

export default page;


