import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaBuilding, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { setSingleCompany } from '../../redux/companySlice';

const CreateCompanyModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${COMPANY_API_END_POINT}/register`, {
                name,
                description,
                location,
                website
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response?.data?.success) {
                dispatch(setSingleCompany(response.data.company));
                toast.success(response.data.message);
                navigate(`/companies`);
                onClose(); // Close the modal after successful submission
            } else {
                toast.error(response.data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error('An error occurred during registration');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 text-2xl hover:text-gray-800 transition-transform transform hover:scale-110">
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Register Company</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <FaBuilding className="text-gray-500" />
                        <label htmlFor="name" className="block text-gray-700">Company Name</label>
                    </div>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ease-in-out"
                        placeholder="Enter company name"
                    />
                    
                    <div className="flex items-center space-x-2">
                        <FaBuilding className="text-gray-500" />
                        <label htmlFor="description" className="block text-gray-700">Description</label>
                    </div>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ease-in-out"
                        placeholder="Enter company description"
                    />
                    
                    <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-gray-500" />
                        <label htmlFor="location" className="block text-gray-700">Location</label>
                    </div>
                    <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ease-in-out"
                        placeholder="Enter location"
                    />
                    
                    <div className="flex items-center space-x-2">
                        <FaGlobe className="text-gray-500" />
                        <label htmlFor="website" className="block text-gray-700">Website</label>
                    </div>
                    <input
                        id="website"
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ease-in-out"
                        placeholder="Enter website URL"
                    />
                    
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300 ease-in-out"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCompanyModal;
