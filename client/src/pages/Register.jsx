import React, { useState } from 'react';
import signupImage from "../assets/signUpImage.png";
import { FaGoogle, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { GoTriangleDown } from "react-icons/go";

import toast from 'react-hot-toast';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        // file: ""
    });

    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.role) {
            toast.error("Please select a role.");
            return;
        }

        // if (!input.file) {
        //     toast.error("Please upload a profile picture.");
        //     return;
        // }

        const formData = new FormData();    //formdata object
        formData.append("firstName", input.firstName);
        formData.append("lastName", input.lastName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        // formData.append("file", input.file);

        console.log([...formData.entries()]);  // Debugging line to check formData

        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
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
                    <p className="font-semibold text-lg">Get Started Today</p>
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
                <h2 className="text-gray-500 text-lg font-semibold mb-2">Start for Free</h2>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#fb01cb] via-[#333399] to-[#333399] text-transparent bg-clip-text mb-8">
                    Sign up to Xoolve
                </h1>
                <form className="flex flex-col gap-6" onSubmit={submitHandler}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={input.firstName}
                                onChange={changeEventHandler}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="First Name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={input.lastName}
                                onChange={changeEventHandler}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="Last Name"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mobile No</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="Mobile No"
                            required
                        />
                    </div>
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
                    <div className="flex gap-3 items-center">
                        <label className="text-sm font-medium text-gray-700">Role</label>
                        <input
                            className="cursor-pointer"
                            type="radio"
                            id="freelancer"
                            name="role"
                            value="freelancer"
                            checked={input.role === 'freelancer'}
                            onChange={changeEventHandler}
                            required
                        />
                        <label className="cursor-pointer" htmlFor="freelancer">Freelancer</label>

                        <input
                            className="cursor-pointer"
                            type="radio"
                            id="recruiter"
                            name="role"
                            value="recruiter"
                            checked={input.role === 'recruiter'}
                            onChange={changeEventHandler}
                            required
                        />
                        <label className="cursor-pointer" htmlFor="recruiter">Recruiter</label>
                    </div>
                    {/* <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Profile Picture</label>
                        <input
                            type="file"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            onChange={(e) => setInput({ ...input, file: e.target.files[0] })}
                            required
                        />
                    </div> */}
                    
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-[#fb01cb] via-[#333399] to-[#333399] text-white font-bold"
                    >
                        Create Account
                    </button>
                </form>
                <button className="w-full py-3 mt-4 rounded-xl bg-white text-blue-700 border border-blue-700 flex items-center justify-center gap-2">
                    <FcGoogle className="text-lg" /> Sign up with Google
                </button>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 font-semibold">
                            Log in
                        </Link>
                    </p>
                </div>
                <div className="mt-4 flex items-start gap-2">
                        <input type="checkbox" className="mt-1" required />
                        <p className="text-gray-600 text-xs">
                            By accessing or using our Service, you agree to be bound by these
                            Terms. If you disagree with any part of the terms, you may not
                            access the Service.
                        </p>
                    </div>
            </div>
        </div>
    );
}

export default Register;
