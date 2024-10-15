'use client'

import Loading from "@/app/loading";
import { signOut, useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const page = () => {
    const [data, setData] = useState({ Value: '', select: '' });
    const [item, setItem] = useState([]);
    const { data: session, status } = useSession();



    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/dashboard', {
                method: 'GET'
            })
            const response = await res.json();
            setItem(response.items);
        } catch (error) {
            console.log(error.message);
        }
    };


    const addItem = async () => {
        const input = document.querySelector('#item');
        try {
            const res = await fetch('/api/dashboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data })
            })
            fetchData()
            input.value = '';


        } catch (error) {
            console.log('dashboard page:', error.message);
        }

    }

    const handleSubmit = () => {
        const input = document.querySelector('#item');
        const Value = input.value;
        setData({ Value: Value, select: 'public' });
    }

    const handle = (e) => {
        const input = document.querySelector('#item');
        const Value = input.value;
        const select = e.target.value;
        setData({ Value: Value, select: select });
    }
    // console.log('check data', data);
    if (session) {
        return (
            <div className="container-1">

                {/* <div className="w-[25%] h-[100%]">

                </div> */}

                <div>
                    <div className="card form-sign">
                        <div className="w-fit mx-auto"><h1 className="font-semibold">PROFILE PAGE</h1></div>
                        <h2>Welcome, {session.user.name}!</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Item
                            </label>
                            <input
                                type='text'
                                placeholder='enter item here...'
                                id='item'
                                onChange={handleSubmit}
                                onKeyDown={(e) => e.key === 'Enter' && addItem()}
                            />

                            {/* <textarea placeholder="hey" class="text-grey-darkest  p-2 m-1 bg-transparent" name="tt">hello world</textarea> */}
                        </div>

                        <div className="mb-3">
                            <select name="privacy" className="w-full p-2 rounded-sm" onChange={handle}>
                                <option value="public" id="select">Public</option>
                                <option value="private" id="select">Private</option>
                            </select>
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




                    <div className="items mt-5">
                        <h2 className="text-center font-bold">Items Record</h2>
                        <div className="overflow-auto max-h-[300px] designed-scrollbar px-7 my-10">
                            {
                                item.map((items, index) => (
                                    <div key={index} className="item-card">
                                        <div><p>{items.name}</p> <span className="font-bold text-green-800">{items.privacy}</span></div>
                                        <div className="flex gap-2 items-center">
                                            <div className="p-1 cursor-pointer">
                                                <FaUserEdit />
                                            </div>

                                            <div className="p-1 text-red-700 cursor-pointer">
                                                <MdDelete />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <Suspense fallback={<Loading />}><p>Please Sign in</p></Suspense>

};

export default page;

