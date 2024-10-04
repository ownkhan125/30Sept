'use client';


import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiShowAlt, BiSolidHide } from "react-icons/bi";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Page = () => {
    const [active, setActive] = useState();
    const router = useRouter();



    const validationSchema = Yup.object().shape({
        newpassword: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('newpassword'), null], 'Confirm password must be the same as new password')
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



    const Show = () => {
        setActive(!active);
    }

    const handleSubmitData = async (data) => {
        const email = data.email;

        try {
            const res = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: email,
                    subject: 'Verification Code',
                    html: `<button>Verification</button>`
                }),
            });

            if (res.ok) {
                // router.push('/dashboard');
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
    };
    
    return (
        <>
            <div className='container-1'>
                <form onSubmit={handleSubmit(handleSubmitData)}>
                    <div className='form-sign'> 
                        <div className='p-1 text-center font-bold'>
                            <h2>Forget Password</h2>
                        </div>
                        <div className="mb-4 relative my-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Password
                            </label>
                            <input type={active ? 'text' : 'password'} placeholder='enter new password here...' {...register("newpassword")} />
                            {errors.newpassword && <p className="text-red-500">{errors.newpassword.message}</p>}
                            <div className={`${active ? 'hidden' : 'block'} absolute top-10 right-2 text-2xl cursor-pointer`} onClick={() => Show()}><BiSolidHide /></div>
                            <div className={`${active ? 'block' : 'hidden'} absolute top-10 right-2 text-2xl cursor-pointer`} onClick={() => Show()}><BiShowAlt /></div>
                        </div>

                        <div className="mb-4 relative my-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Password
                            </label>
                            <input type={active ? 'text' : 'password'} placeholder='enter confirm password here...' {...register("confirmpassword")} />
                            {errors.confirmpassword && <p className="text-red-500">{errors.confirmpassword.message}</p>}
                            <div className={`${active ? 'hidden' : 'block'} absolute top-10 right-2 text-2xl cursor-pointer`} onClick={() => Show()}><BiSolidHide /></div>
                            <div className={`${active ? 'block' : 'hidden'} absolute top-10 right-2 text-2xl cursor-pointer`} onClick={() => Show()}><BiShowAlt /></div>
                        </div>
                        <button className='btn' type="submit">set password</button>
                    </div>
                </form>
            </div>
        </> 
    );
};

export default Page;
