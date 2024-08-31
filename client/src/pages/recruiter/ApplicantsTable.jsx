import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { MoreHorizontal, FileText, Phone, Mail } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsList = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {applicants && applicants?.applications?.map((item) => (
                <div key={item._id} className="border rounded-lg p-6 shadow-lg bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold">{item?.applicant?.firstName} {item?.applicant?.lastName}</h2>
                            <p className="flex items-center text-gray-100 mt-2"><Mail className="mr-2" />{item?.applicant?.email}</p>
                            <p className="flex items-center text-gray-100 mt-2"><Phone className="mr-2" />{item?.applicant?.phoneNumber}</p>
                        </div>
                        <div className="pb-16">
                        <Popover>
                            <PopoverTrigger>
                                <MoreHorizontal className="cursor-pointer text-white" />
                            </PopoverTrigger>
                            <PopoverContent className="w-32 bg-white text-gray-800">
                                {shortlistingStatus.map((status, index) => (
                                    <div 
                                        onClick={() => statusHandler(status, item?._id)} 
                                        key={index} 
                                        className='my-2 cursor-pointer hover:text-purple-500'>
                                        <span>{status}</span>
                                    </div>
                                ))}
                            </PopoverContent>
                        </Popover>
                        </div>
                    </div>
                    <div className="mt-6">
                        <p className="flex items-center"><FileText className="mr-2" />
                            <span className="font-semibold">Resume:</span> 
                            {item.applicant?.profile?.resume ? (
                                <a 
                                    className="text-blue-600 underline ml-1 hover:text-blue-800 pl-2" 
                                    href={item?.applicant?.profile?.resume} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    {item?.applicant?.profile?.resumeOriginalName}
                                </a>
                            ) : (
                                <span className="ml-1">NA</span>
                            )}
                        </p>
                        <p className="text-gray-100 mt-2">Applied on: {item?.applicant.createdAt.split("T")[0]}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ApplicantsList;
