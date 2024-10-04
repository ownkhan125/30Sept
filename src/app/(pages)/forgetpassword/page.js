'use client';

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const Page = () => {
    const { register, handleSubmit } = useForm();
    const router = useRouter();

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
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input required type='email' placeholder='enter email...' {...register("email")} />
                        </div>
                        <button className='btn' type="submit">Send a Code</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Page;
