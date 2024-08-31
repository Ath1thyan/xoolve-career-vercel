import React, { useState } from 'react';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';
import Layout from '../../components/Layout';
import { HiOutlineOfficeBuilding } from 'react-icons/hi'; // Example icon import

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        const trimmedName = companyName.trim();
        console.log("Trimmed Company Name:", trimmedName);
        
        if (!trimmedName) {
            toast.error("Company name is required.");
            return;
        }
    
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName: trimmedName }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
    
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error("Error details:", error); // Log error details for debugging
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    return (
        <Layout>
            <div className="bg-white h-[85vh] flex items-center justify-center">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-lg shadow-lg max-w-4xl w-full">
                    <div className="my-10 text-center">
                        <HiOutlineOfficeBuilding className="text-5xl mx-auto text-white" />
                        <h1 className="font-bold text-3xl text-white mt-4">Your Company Name</h1>
                        <p className="text-gray-200 mt-2">What would you like to give your company name? You can change this later.</p>
                    </div>

                    <Label className="text-white">Company Name</Label>
                    <Input
                        type="text"
                        className="my-2 bg-white text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="JobHunt, Microsoft etc."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <div className="flex items-center justify-between mt-10">
                        <Button variant="outline" onClick={() => navigate("/companies")} className="text-gray-700 border-gray-400 hover:bg-gray-100 hover:text-gray-900">
                            Cancel
                        </Button>
                        <Button onClick={registerNewCompany} className="bg-indigo-600 text-white hover:bg-indigo-700">
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CompanyCreate;
