'use client'

import Loading from "@/app/loading";
import { signOut, useSession } from "next-auth/react";
import React, { Suspense } from "react";

const Dashboard = () => {
    const { data: session, status } = useSession();


    // if (status === "loading") {
    //     return <Loader />
    // }

    if (session) {
        return (
            <div className="card">
                <h1>Welcome, {session.user.email}!</h1>

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
