import React, { useState } from 'react';
import { FaPencilAlt, FaUpload, FaDownload, FaPlus, FaEnvelope, FaShare, FaPhoneAlt, FaUsers, FaBehance, FaLinkedin, FaFilePdf, FaGlobe } from 'react-icons/fa';
import { Modal, Button, Input } from 'antd';
import Layout from '../components/Layout';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { USER_API_END_POINT } from '../utils/constant';
import { Link } from 'react-router-dom';
import UpdateProfileDialog from './UpdateProfileDialog';
import RecruiterProfile from './recruiter/RecruiterProfile';

const isResume = true;

const ProfilePage = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.user);
    console.log(user)

    return (
        <Layout>
            <div className="p-2 bg-purple-50 ">

                {/* Profile Header */}
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6">
                    <div className={`relative w-40 h-40 overflow-hidden border-4 ${user?.role == 'freelancer' ? "border-green-400 rounded-full ml-5 cursor-pointer hover:border-green-500 transition duration-300" : "border-blue-400 rounded-full ml-5 cursor-pointer hover:border-blue-500 transition duration-300"} `}
                    >
                        <img
                            src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : "https://via.placeholder.com/150"}
                            alt="Profile"
                            className="rounded-full w-40 h-40 object-cover"
                        />
                    </div>
                    <div className="flex-1 m-3 ml-5">
                        <h1 className="text-3xl font-bold text-gray-800">{user?.firstName} {user?.lastName}</h1>
                        <p className="text-gray-600 mt-1">{user?.profile?.bio ? user?.profile?.bio : "Add your bio"}</p>
                        <div className="flex items-center gap-4 mt-4 text-gray-700">
                            <FaEnvelope /><a href={`mailto:${user?.email}`} className="text-blue-500 hover:underline">{user?.email}</a>
                            <span className="text-gray-500">|</span>
                            <FaPhoneAlt /><span>{user?.phoneNumber ? user?.phoneNumber : "999-9999-999"}</span>
                            <span className="text-gray-500">|</span>
                            <FaBehance /><a target="blank" href="https://www.behance.net/" className="text-blue-500 hover:underline">Behance</a>
                            <span className="text-gray-500">|</span>
                            <FaLinkedin /><a target="blank" href="https://www.linkedin.com/" className="text-blue-500 hover:underline">LinkedIn</a>
                        </div>
                        <div className="mt-4 text-gray-700 flex items-center gap-2">
                            <FaUsers /><Link to='/my-network' className=" text-blue-500 hover:underline">250 Connections</Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-start gap-4">
                        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition duration-300">
                            <FaShare className="text-gray-600" />
                            <span className="text-gray-800">Share Profile</span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition duration-300"
                            onClick={() => setOpen(true)}>
                            <FaPencilAlt className="text-gray-600" />
                            <span className="text-gray-800">Edit Profile</span>
                        </div>
                    </div>
                </div>

                {/* Resume and Portfolio */}
                {
                    user?.role == "freelancer" && (
                        <div className="bg-purple-100 bg-opacity-80 p-6 mt-6 rounded-lg shadow-lg flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-4 text-gray-800">
                                    <FaFilePdf className="text-red-500" />
                                    {
                                        isResume && user?.profile?.resume ? (
                                            <a target="_blank" href={user?.profile?.resume} className="text-blue-500 w-full hover:underline cursor-pointer">
                                                {user?.profile?.resumeOriginalName || "Add Resume"}
                                            </a>
                                        ) : (
                                            <span>Resume</span>
                                        )
                                    }
                                </div>

                                <div className="flex items-center gap-4 mt-3 text-gray-800">
                                    <FaGlobe className="text-green-500" />
                                    <a href="https://www.figma.com/proto/..." className="text-blue-600 hover:underline">Portfolio</a>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 flex items-center px-4 py-2 rounded-lg transition duration-300">
                                    <FaUpload className="mr-2" /> Upload
                                </button>
                                <button className="bg-green-500 text-white hover:bg-green-600 flex items-center px-4 py-2 rounded-lg transition duration-300">
                                    <FaDownload className="mr-2" /> Download
                                </button>
                            </div>
                        </div>
                    )
                }


                {/* Skills */}
                {
                    user?.role == "freelancer" && (
                        <div className="bg-purple-100 bg-opacity-80 p-6 mt-6 rounded-lg shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-bold text-gray-800">Skills</h3>
                                <FaPlus className="text-gray-600 cursor-pointer hover:text-gray-800 transition duration-300" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {user?.profile?.skills.length !== 0 ? (
                                    user?.profile?.skills.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full font-medium shadow-sm"
                                        >
                                            {item}
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-gray-600">NA</span>
                                )}
                            </div>
                        </div>
                    )
                }



                {/* Education and Experience */}
                {
                    user?.role == "freelancer" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-gradient-to-r from-pink-200 to-purple-300 p-6 rounded-lg shadow-lg">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold text-gray-800">Education</h3>
                                    <FaPencilAlt className="text-gray-600 cursor-pointer" />
                                </div>
                                <p className="mt-2 text-gray-600 font-semibold">B.Sc. Physics</p>
                                <p className="text-gray-600">The Madura College, 2013-2016, Full time, 62%</p>
                                <p className="mt-2 text-gray-600 font-semibold">HSC (Computer science)</p>
                                <p className="text-gray-600">EVRN Corp. Girls.hr.sec.school, 2012-2013, Full time, 75%</p>
                            </div>
                            <div className="bg-gradient-to-r from-pink-200 to-purple-300 p-6 rounded-lg shadow-lg">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold text-gray-800">Experience</h3>
                                    <FaPencilAlt className="text-gray-600 cursor-pointer" />
                                </div>
                                <p className="mt-2 text-gray-600 font-semibold">Graphic Designer Internship</p>
                                <p className="text-gray-600">Nextlevel Web Solution, Gujarat, India, Oct 2023 - Mar 2024, Full time, 62%</p>
                            </div>
                        </div>
                    )
                }


                {/* Additional Sections */}
                {
                    user?.role == "freelancer" && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            {['Certificate', 'Projects', 'KYC', 'Preferred Location', 'Hobbies'].map((item) => (
                                <div
                                    key={item}
                                    className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between cursor-pointer"
                                >
                                    <span className="text-gray-800 font-bold">{item}</span>
                                    <FaPlus className="text-purple-600" />
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
            {user?.role == "recruiter" && (
          <>
            <RecruiterProfile />
          </>
        )}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </Layout>
    );
};

export default ProfilePage;
