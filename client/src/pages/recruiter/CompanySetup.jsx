import React, { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import { ArrowLeft, Upload, Globe, MapPin, Edit, Loader2 } from 'lucide-react';

import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import useGetCompanyById from '../../hooks/useGetCompanyById'
import Layout from '../../components/Layout'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        const token = localStorage.getItem('token');
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: singleCompany?.file || null
        })
    }, [singleCompany]);

    return (
        <Layout>
            <div className='max-w-xl mx-auto my-10 bg-white shadow-lg rounded-lg p-8'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 mb-8'>
                        <Button onClick={() => navigate("/companies")} variant="outline" className="flex items-center gap-2 text-gray-600 font-semibold hover:text-gray-900">
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-2xl text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-1 gap-6'>
                        <div>
                            <Label className="text-gray-700">Company Name</Label>
                            <div className='relative'>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    className="border-2 border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-2"
                                />
                                <Edit className="absolute right-3 top-3 text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <Label className="text-gray-700">Description</Label>
                            <div className='relative'>
                                <Input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="border-2 border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-2"
                                />
                                <Edit className="absolute right-3 top-3 text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <Label className="text-gray-700">Website</Label>
                            <div className='relative'>
                                <Input
                                    type="text"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    className="border-2 border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-2"
                                />
                                <Globe className="absolute right-3 top-3 text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <Label className="text-gray-700">Location</Label>
                            <div className='relative'>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    className="border-2 border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-2"
                                />
                                <MapPin className="absolute right-3 top-3 text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <Label className="text-gray-700">Logo</Label>
                            <div className='relative'>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className="border-2 border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-2"
                                />
                                <Upload className="absolute right-3 top-3 text-gray-400" />
                            </div>
                        </div>
                    </div>
                    {
                        loading ? (
                            <Button className="w-full my-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90">
                                Update
                            </Button>
                        )
                    }
                </form>
            </div>
        </Layout>
    )
}

export default CompanySetup