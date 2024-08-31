import React, { useState } from 'react';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '../../utils/constant';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import Layout from '../../components/Layout';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Layout>
            <div className='flex items-center h-[85vh] justify-center my-5'>
                <form onSubmit={submitHandler} className='p-8 border border-gray-200 shadow-xl rounded-lg bg-white'>
                    {/* Back Button */}
                    <div className='mb-6'>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors duration-300"
                            onClick={() => navigate("/admin/jobs")}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Jobs
                        </Button>
                    </div>
                    
                    <div className='grid grid-cols-2 gap-4'>
                        <div className="flex flex-col">
                            <Label className="text-sm font-semibold text-gray-600">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="my-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                placeholder="Enter job title"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label className="text-sm font-semibold text-gray-600">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="my-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                placeholder="Enter job description"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label className="text-sm font-semibold text-gray-600">Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="my-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                placeholder="Enter job requirements"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label className="text-sm font-semibold text-gray-600">Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="my-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                placeholder="Enter salary range"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label className="text-sm font-semibold text-gray-600">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="my-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                placeholder="Enter job location"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label className="text-sm font-semibold text-gray-600">Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="my-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                placeholder="Enter job type"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label className="text-sm font-semibold text-gray-600">Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="my-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                placeholder="Enter experience level"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label className="text-sm font-semibold text-gray-600">No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="my-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                placeholder="Enter number of positions"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div className="flex flex-col">
                                    <Label className="text-sm font-semibold text-gray-600">Select Company</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full my-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => (
                                                        <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                                                            {company.name}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }
                    </div>
                    {
                        loading ? (
                            <Button className="w-full my-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md shadow-lg flex justify-center items-center gap-2">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full my-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-md shadow-lg transition-all duration-300"
                            >
                                Post New Job
                            </Button>
                        )
                    }
                    {
                        companies.length === 0 && (
                            <p className='text-sm text-red-600 font-semibold text-center my-4'>
                                *Please register a company first, before posting jobs
                            </p>
                        )
                    }
                </form>
            </div>
        </Layout>
    )
}

export default PostJob;
