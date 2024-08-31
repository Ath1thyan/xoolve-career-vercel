import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/chat/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setOnlineUsers } from './redux/userSlice';
import { BASE_URL } from './utils/constant';
import io from 'socket.io-client';
import { setSocket } from './redux/socketSlice';
import Profile from './pages/ProfilePage';
import Companies from './pages/recruiter/Companies';
import AdminJobs from './pages/recruiter/AdminJobs';
import AdminProjects from './pages/recruiter/AdminProjects';
import MyNetwork from './pages/MyNetwork';
import Freelance from './pages/freelancer/Freelance';
import AppliedJobs from './pages/freelancer/AppliedJobs';
import SearchJobs from './pages/freelancer/SearchJobs';
import MyBids from './pages/freelancer/MyBids';
import AiAssistant from './pages/freelancer/AiAssistant';
import PostJob from './pages/recruiter/PostJob';
import CompanyCreate from './pages/recruiter/CompanyCreate';
import CompanySetup from './pages/recruiter/CompanySetup';
import Applicants from './pages/recruiter/Applicants';
import PostProject from './pages/recruiter/PostProject';
import Bids from './pages/recruiter/Bids';
import HelpAndSupport from './pages/HelpAndSupport';
import Notifications from './pages/notification/Notifications';

const App = () => {
    const [loading, setLoading] = useState(true); // New loading state
    const { user } = useSelector(store => store.user);
    const { socket } = useSelector(store => store.socket);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            dispatch(setUser(parsedUser));

            const socketio = io(`${BASE_URL}`, {
                query: {
                    userId: parsedUser._id
                }
            });
            dispatch(setSocket(socketio));

            socketio.on('getOnlineUsers', (onlineUsers) => {
                dispatch(setOnlineUsers(onlineUsers));
            });

            // Ensure loading is set to false after setting the user
            setLoading(false);

            return () => {
                socketio.close();
                dispatch(setSocket(null));
            };
        } else {
            if (socket) {
                socket.close();
                dispatch(setSocket(null));
            }
            setLoading(false); // Ensure loading is set to false even if no user is found
        }
    }, []);

    useEffect(() => {
        if (user && user._id && socket) {
            socket.emit('setUser', user._id);
        }
    }, [user, socket]);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a proper loading spinner or component
    }

    return (
        <BrowserRouter>
            <Toaster position="bottom-right" reverseOrder={false} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {
                    user?.role == "freelancer" && (
                        <Route path="/chat" element={<Chat />} />
                    )
                }
                {
                    user?.role == "recruiter" && (
                        <Route path="/chat" element={<Chat />} />
                    )
                }
                {
                    user?.role == "freelancer" && (
                        <Route path="/notifications" element={<Notifications />} />
                    )
                }
                {
                    user?.role == "recruiter" && (
                        <Route path="/notifications" element={<Notifications />} />
                    )
                }
                {
                    user?.role == "freelancer" && (
                        <Route path="/help-and-support" element={<HelpAndSupport />} />
                    )
                }
                {
                    user?.role == "recruiter" && (
                        <Route path="/help-and-support" element={<HelpAndSupport />} />
                    )
                }
                {
                    user?.role == "freelancer" && (
                        <Route path="/" element={<Profile />} />
                    )
                }
                {
                    user?.role == "recruiter" && (
                        <Route path="/" element={<Profile />} />
                    )
                }
                {
                    user?.role == "recruiter" && (
                        <Route path="/companies" element={<Companies />} />
                    )
                }
                {
                    user?.role == "recruiter" && (
                        <Route path="/admin/jobs" element={<AdminJobs />} />
                    )
                }
                {
                    user?.role == "recruiter" && (
                        <Route path="/admin/companies/create" element={<CompanyCreate />} />
                    )
                }
                {
                    user?.role == "recruiter" && (
                        <Route path="/admin/companies/:id" element={<CompanySetup />} />
                    )
                }
                {
                    user?.role == "recruiter" && (
                        <Route path="/admin/jobs/:id/applicants" element={<Applicants />} />
                    )
                }
                {
                    user?.role == "recruiter" && (
                        <Route path="/admin/projects/:id/bids" element={<Bids />} />
                    )
                }
                {
                    user?.role == "recruiter" && (
                        <Route path="/admin/jobs/create" element={<PostJob />} />
                    )
                }
                {
                    user?.role == "recruiter" && (
                        <Route path="/admin/projects/create" element={<PostProject />} />
                    )
                }
                {
                    user?.role == "recruiter" && (
                        <Route path="/admin/projects" element={<AdminProjects />} />
                    )
                }
                {
                    user?.role == "recruiter" && (
                        <Route path="/my-network" element={<MyNetwork />} />
                    )
                }
                {
                    user?.role == "freelancer" && (
                        <Route path="/my-network" element={<MyNetwork />} />
                    )
                }
                {
                    user?.role == "freelancer" && (
                        <Route path="/freelance" element={<Freelance />} />
                    )
                }
                {
                    user?.role == "freelancer" && (
                        <Route path="/applied-jobs" element={<AppliedJobs />} />
                    )
                }
                {
                    user?.role == "freelancer" && (
                        <Route path="/my-bids" element={<MyBids />} />
                    )
                }
                {
                    user?.role == "freelancer" && (
                        <Route path="/ai-assistant" element={<AiAssistant />} />
                    )
                }
                {
                    user?.role == "freelancer" && (
                        <Route path="/search-jobs" element={<SearchJobs />} />
                    )
                }
                {
                    user?.role === "freelancer" || user?.role === "recruiter" ? (
                        <Route path="/" element={<Profile />} />
                    ) : (
                        <Route path="/" element={<Login />} />
                    )
                }

            </Routes>
        </BrowserRouter>
    );
};

export default App;
