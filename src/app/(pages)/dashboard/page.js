'use client'

import { signOut, useSession } from "next-auth/react";

const Dashboard = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

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

    return <p>Please sign in</p>;
};

export default Dashboard;
