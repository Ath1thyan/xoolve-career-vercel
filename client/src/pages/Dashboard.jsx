import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';

const Dashboard = () => {
    const { user } = useSelector((state) => state.user);
    console.log(user);

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white rounded-lg shadow-md p-10">
                {user ? (
                    <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome, {user.firstName}!
                    </h1>
                    
                    </div>
                ) : (
                    <h1 className="text-3xl font-bold text-gray-800">
                        Loading user data...
                    </h1>
                )}
            </div>
        </Layout>
    );
};

export default Dashboard;
