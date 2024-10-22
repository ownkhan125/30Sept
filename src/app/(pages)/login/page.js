'use client';

import { BiShowAlt, BiSolidHide } from "react-icons/bi";
import { useForm } from "react-hook-form";
import React, { Suspense, useState } from 'react'
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";


const page = () => {
    const [active, setActive] = useState();
    const [loading, setLoading] = useState();
    const router = useRouter();

    const Show = () => {
        setActive(!active);
    }

    const { register, handleSubmit } = useForm();


    const handleSubmitData = async (data) => {
        setLoading(true)
        try {
            const result = await signIn(
                'Verify',
                {
                    ...data,
                    redirect: false
                }
            );


            if (result.ok) {
                router.push('/dashboard');
            }
            else if (!result.ok) {
                alert('incorrect password')
                setLoading(false)
            }
            else {
                router.push('/login');
            }


        } catch (error) {
            console.log('Login page:', error?.message);
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
                            {loading ? <Loading /> : 'Login'}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <Suspense fallback={<Loading />}>
                            <button
                                className="btn"
                                onClick={() => { signIn("google", { callbackUrl: '/dashboard' }), setLoading(true) }}
                            >
                                {loading ? <Loading /> : 'Login with Google'}
                            </button>
                        </Suspense>
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


