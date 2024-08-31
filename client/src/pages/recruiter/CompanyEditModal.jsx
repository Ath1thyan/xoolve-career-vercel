import React, { useState, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const COMPANY_API_END_POINT = "xoolve-career-vercel.vercel.app/api/v1/company";

const CompanyEditModal = ({ companyId, onClose }) => {
  const [companyData, setCompanyData] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    // logo: ''
  });

  useEffect(() => {
    const fetchCompanyData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        if (response.data.success) {
          setCompanyData(response.data.company);
        } else {
          toast.error('Company not found.');
        }
      } catch (error) {
        toast.error('Error fetching company data.');
        console.log(error);
      }
    };
    
    if (companyId) {
      fetchCompanyData();
    }
  }, [companyId]);

  const handleInputChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${COMPANY_API_END_POINT}/update/${companyId}`, companyData, {
        headers: {
          Authorization: `Bearer ${token}`
          },
          withCredentials: true
      });
      if (response.data.success) {
        toast.success('Company information updated successfully!');
        onClose();
      } else {
        toast.error('Failed to update company information.');
      }
    } catch (error) {
      toast.error('Error updating company information.');
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-6 relative">
        <AiFillCloseCircle 
          className="text-red-500 text-2xl absolute top-3 right-3 cursor-pointer" 
          onClick={onClose} 
        />
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Edit Company Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Company Name</label>
            <input 
              type="text" 
              name="name" 
              value={companyData.name} 
              onChange={handleInputChange} 
              className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea 
              name="description" 
              value={companyData.description} 
              onChange={handleInputChange} 
              className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Website</label>
            <input 
              type="text" 
              name="website" 
              value={companyData.website} 
              onChange={handleInputChange} 
              className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Location</label>
            <input 
              type="text" 
              name="location" 
              value={companyData.location} 
              onChange={handleInputChange} 
              className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-2 mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default CompanyEditModal;
