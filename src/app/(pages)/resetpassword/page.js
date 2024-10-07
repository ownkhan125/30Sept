'use client';


import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiShowAlt, BiSolidHide } from "react-icons/bi";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


// form validation
const validationSchema = Yup.object().shape({
    newpassword: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmpassword: Yup.string()
        .oneOf([Yup.ref('newpassword'), null], 'Confirm password must be the same as new password')
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
});

const Page = () => {
    const searchParam = useSearchParams();
    const [active, setActive] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const token = searchParam.get("token");

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
        const { confirmpassword } = data;

        try {
            setIsLoading(true)
            const res = await fetch('/api/auth/resetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    confirmpassword,
                    token
                }),
            });

            if (res.ok) {
                // router.push('/dashboard');
                console.log("Your password has been reset successfully");
            }
        } catch (error) {
            console.error('Request failed:', error);
        } finally {
            setIsLoading(false)
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
                                New Password
                            </label>
                            <input type={active ? 'text' : 'password'} placeholder='enter new password here...' {...register("newpassword")} />
                            {errors.newpassword && <p className="text-red-500">{errors.newpassword.message}</p>}
                            <div className={`${active ? 'hidden' : 'block'} absolute top-10 right-2 text-2xl cursor-pointer`} onClick={() => Show()}><BiSolidHide /></div>
                            <div className={`${active ? 'block' : 'hidden'} absolute top-10 right-2 text-2xl cursor-pointer`} onClick={() => Show()}><BiShowAlt /></div>
                        </div>

                        <div className="mb-4 relative my-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Confirm Password
                            </label>
                            <input type={active ? 'text' : 'password'} placeholder='enter confirm password here...' {...register("confirmpassword")} />
                            {errors.confirmpassword && <p className="text-red-500">{errors.confirmpassword.message}</p>}
                            <div className={`${active ? 'hidden' : 'block'} absolute top-10 right-2 text-2xl cursor-pointer`} onClick={() => Show()}><BiSolidHide /></div>
                            <div className={`${active ? 'block' : 'hidden'} absolute top-10 right-2 text-2xl cursor-pointer`} onClick={() => Show()}><BiShowAlt /></div>
                        </div>
                        <button className='btn' type="submit" disabled={isLoading}>{isLoading ? "Processing..." : "set password"}</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Page;
