import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBell, FaFacebookMessenger, FaDoorOpen, FaUser, FaSearch, FaBriefcase, FaUsers, FaProjectDiagram, FaBuilding, FaClipboardList } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Badge, Avatar } from 'antd';
import { FaHeadset, FaLaptopCode, FaMicrochip, FaSackDollar } from 'react-icons/fa6';
import axios from 'axios';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector(state => state.user);
    const [unseenCount, setUnseenCount] = useState(0);

    const USER_API_END_POINT = "xoolve-career-vercel.vercel.app/api/v1/user";

    useEffect(() => {
        const fetchUnseenNotifications = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${USER_API_END_POINT}/notifications/unseen`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });
                setUnseenCount(response.data.notifications.length);
            } catch (error) {
                console.error("Error fetching unseen notifications:", error);
            }
        };
        fetchUnseenNotifications();
    }, [USER_API_END_POINT]);

    const freelancerMenu = [
        { name: 'Profile', path: '/', icon: <FaUser /> },
        { name: 'Search Jobs', path: '/search-jobs', icon: <FaSearch /> },
        { name: 'Applied Jobs', path: '/applied-jobs', icon: <FaBriefcase /> },
        { name: 'My Bids', path: '/my-bids', icon: <FaSackDollar /> },
        { name: 'Connections', path: '/my-network', icon: <FaUsers /> },
        { name: 'Freelance', path: '/freelance', icon: <FaLaptopCode /> },
        { name: 'AI Assistant', path: '/ai-assistant', icon: <FaMicrochip /> },
        { name: 'Help and Support', path: '/help-and-support', icon: <FaHeadset /> },
    ];

    const recruiterMenu = [
        { name: 'Profile', path: '/', icon: <FaClipboardList /> },
        { name: 'My Network', path: '/my-network', icon: <FaUsers /> },
        { name: 'Companies', path: '/companies', icon: <FaBuilding /> },
        { name: 'Jobs', path: '/admin/jobs', icon: <FaBriefcase /> },
        { name: 'Projects', path: '/admin/projects', icon: <FaProjectDiagram /> },
        { name: 'Help and Support', path: '/help-and-support', icon: <FaHeadset /> },
    ];

    const menuToBeRendered = user?.role === "freelancer" ? freelancerMenu : recruiterMenu;
    const profileBorderColor = user?.role === "freelancer" ? "border-green-500" : "border-blue-500";

    return (
        <div className="flex ">
            {/* Sidebar */}
            <div className="w-1/6 fixed top-0 left-0 h-full bg-gradient-to-t from-purple-200 via-pink-200 to-pink-200 p-6 overflow-scroll">
                <div className="text-center mt-8 mb-8">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-b from-[#fb01cb] via-[#b63d8e] to-[#333399] text-transparent bg-clip-text mb-2">
                        Xoolve
                    </h1>
                </div>
                <div className="space-y-8 flex flex-col justify-between h-2/4">
                    {menuToBeRendered.map((menu, index) => (
                        <div key={index} className="group flex flex-col">
                            <Link
                                to={menu.path}
                                className={`flex items-center text-lg font-medium p-2 rounded-md ${location.pathname === menu.path ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 text-white' : 'text-slate-700'} group-hover:bg-gradient-to-r from-purple-300 via-pink-400 to-pink-500`}
                            >
                                <span className="mr-2">{menu.icon}</span>
                                {menu.name}
                            </Link>
                        </div>
                    ))}
                    <div className="flex items-center justify-between text-lg font-medium p-2">
                        <div
                            onClick={() => {
                                localStorage.clear();
                                navigate('/login');
                            }}
                            className="cursor-pointer flex items-center text-lg font-medium text-red-500 hover:text-red-600"
                        >
                            <FaDoorOpen className="mr-2" /> Logout
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-5/6 ml-[16.666%] flex flex-col bg-gray-100">
                {/* Header */}
                <div className="fixed top-0 left-[16.666%] w-5/6 p-4 pr-6 bg-gradient-to-l from-purple-200 via-pink-200 to-pink-200 z-10">
                    <div className="flex justify-end items-center">
                        <div className="flex items-center gap-6">
                            {unseenCount > 0 ? (
                                <Badge count={unseenCount} showZero>
                                    <FaBell
                                        className={`text-xl cursor-pointer ${location.pathname === '/notifications' ? 'text-blue-500' : 'text-gray-700'}`}
                                        onClick={() => navigate('/notifications')}
                                    />
                                </Badge>
                            ) : (
                                <Badge>
                                    <FaBell
                                        className={`text-xl cursor-pointer ${location.pathname === '/notifications' ? 'text-blue-500' : 'text-gray-700'}`}
                                        onClick={() => navigate('/notifications')}
                                    />
                                </Badge>
                            )}
                            <Link to="/chat">
                                <FaFacebookMessenger className={`text-xl cursor-pointer ${location.pathname === '/chat' ? 'text-blue-500' : 'text-gray-700'}`} />
                            </Link>
                            <Link to={user?.role === "freelancer" ? "/" : "/"}>
                                <Avatar size={40} src={user?.profile?.profilePhoto} className={`border-4 ${profileBorderColor}`} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scrollable Children Area */}
                <div className="mt-[5.5rem] pl-4 pt-0 pr-4 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
