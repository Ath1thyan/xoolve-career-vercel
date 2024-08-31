import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { FaUpload } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import Layout from '../components/Layout';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills?.join(', ') || '',
        file: user?.profile?.resume || '',
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstName', input.firstName);
        formData.append('lastName', input.lastName);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills.split(',').map(skill => skill.trim()));
    
        if (input.file) {
            formData.append('file', input.file);
        }
        const token = localStorage.getItem('token');
    
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true,
            });
            if (res.data.success) {
                // Update Redux store
                dispatch(setUser(res.data.user));
    
                // Update local storage
                localStorage.setItem('user', JSON.stringify(res.data.user));
    
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };
    

    return (
        <Layout>
            <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center ${open ? '' : 'hidden'}`}>
                <div className="bg-white rounded-lg p-6 w-full sm:max-w-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Update Profile</h2>
                        <AiOutlineClose className="text-gray-600 cursor-pointer" onClick={() => setOpen(false)} />
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="firstName" className="text-right">First Name</label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    className="col-span-3 border border-gray-300 rounded-lg p-2"
                                    value={input.firstName}
                                    onChange={changeEventHandler}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="lastName" className="text-right">Last Name</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    className="col-span-3 border border-gray-300 rounded-lg p-2"
                                    value={input.lastName}
                                    onChange={changeEventHandler}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="email" className="text-right">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="col-span-3 border border-gray-300 rounded-lg p-2"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="phoneNumber" className="text-right">Phone Number</label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    className="col-span-3 border border-gray-300 rounded-lg p-2"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="bio" className="text-right">Bio</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    className="col-span-3 border border-gray-300 rounded-lg p-2"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="skills" className="text-right">Skills</label>
                                <input
                                    id="skills"
                                    name="skills"
                                    type="text"
                                    className="col-span-3 border border-gray-300 rounded-lg p-2"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    placeholder="Comma-separated skills"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="file" className="text-right">Resume</label>
                                <input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="col-span-3 cursor-pointer border border-gray-300 rounded-lg p-2"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            {loading ? (
                                <button
                                    disabled
                                    className="w-full bg-gray-500 text-white py-2 rounded-lg flex items-center justify-center"
                                >
                                    <FaUpload className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait...
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
                                >
                                    Update
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProfileDialog;
