'use client'

import Loading from "@/app/loading";
import { signOut, useSession } from "next-auth/react";
import React, { Suspense, useState } from "react";

const Dashboard = () => {
    const [data, setData] = useState();
    const { data: session, status } = useSession();

    const addItem = async () => {
        const input = document.querySelector('#item')
        setData(input.value);
        try {
            const res = await fetch('/api/dashboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data })
            })

        } catch (error) {

        }

    }


    if (session) {
        return (
            <div className="card text-center form-sign">
                <h1 className="font-semibold">PROFILE PAGE</h1>
                <h2>Welcome, {session.user.name}!</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                        Item
                    </label>
                    <input required type='text' placeholder='enter item here...' id='item' />
                </div>

                <button className="btn my-2" onClick={() => addItem()}>
                    Add Item
                </button>

                <button className="btn my-2" onClick={() => {
                    signOut({
                        redirect: true,
                        callbackUrl: '/login'
                    });
                }}>
                    Logout
                </button>
            </div>
        );
    }

    return <Suspense fallback={<Loading />}><p>Please Sign in</p></Suspense>

};

export default Dashboard;
