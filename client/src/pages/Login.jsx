import React, { useState, useEffect } from 'react';
import signupImage from "../assets/signUpImage.png";
import { FaGoogle, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { GoTriangleDown } from "react-icons/go";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertSlice';

import toast from 'react-hot-toast';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../redux/userSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
    
        const data = {
            email: input.email,
            password: input.password,
        };
    
        try {
            dispatch(showLoading());
            const res = await axios.post(`${USER_API_END_POINT}/login`, data, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            dispatch(hideLoading());
    
            if (res.data.success) {
                navigate("/");
                toast.success(res.data.message);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                dispatch(setUser(res.data.user));
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            toast.error(error.response.data.message || "Something went wrong.");
        }
    };


    
    

    return (
        <div className="flex min-h-screen">
            {/* Left Side */}
            <div className="w-1/2 bg-[#f5f5f5] flex flex-col justify-center items-center p-10">
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#fb01cb] via-[#b63d8e] to-[#333399] text-transparent bg-clip-text mb-4">
                        Xoolve
                    </h1>
                    <p className="font-semibold text-lg">Welcome Back</p>
                    <p className="text-gray-600 mb-10">
                        Easy way to get your dream job{" "}
                        <span className="font-bold text-blue-800">Become an Xpert</span>
                    </p>
                </div>
                <img src={signupImage} alt="Sign up" className="w-3/4 h-auto object-cover mb-8" />
                <div className="flex gap-4 text-pink-500">
                    <FaGoogle className="h-5 w-5 cursor-pointer" />
                    <FaFacebookF className="h-5 w-5 cursor-pointer" />
                    <FaInstagram className="h-5 w-5 cursor-pointer" />
                    <FaYoutube className="h-5 w-5 cursor-pointer" />
                    <FaXTwitter className="h-5 w-5 cursor-pointer" />
                </div>
            </div>

            {/* Right Side */}
            <div className="w-1/2 flex flex-col justify-center p-10 bg-white">
                <div className="flex justify-end items-center gap-2 text-blue-700 mb-4">
                    <p>English (USA)</p>
                    <GoTriangleDown className="h-5 w-5" />
                </div>
                <h2 className="text-gray-500 text-lg font-semibold mb-2">We are happy to have you Back</h2>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#fb01cb] via-[#333399] to-[#333399] text-transparent bg-clip-text mb-8">
                    Login to Xoolve
                </h1>
                <form className="flex flex-col gap-6" onSubmit={submitHandler}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email ID</label>
                        <input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="abc@gmail.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="Password"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-[#fb01cb] via-[#333399] to-[#333399] text-white font-bold"
                    >
                        Login
                    </button>
                </form>
                <button className="w-full py-3 mt-4 rounded-xl bg-white text-blue-700 border border-blue-700 flex items-center justify-center gap-2">
                    <FcGoogle className="text-lg" /> Sign in with Google
                </button>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Dont have an account?{" "}
                        <Link to="/register" className="text-blue-600 font-semibold">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
