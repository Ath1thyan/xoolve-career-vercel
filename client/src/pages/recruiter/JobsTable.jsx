import React, { useEffect, useState } from 'react'
import { Edit2, Eye } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const JobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => { 
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-5">Recent Posted Jobs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filterJobs?.map((job) => (
                    <div key={job._id} className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{job?.company?.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{job?.title}</p>
                        <p className="text-xs text-gray-400 mb-4">Posted on: {job?.createdAt.split("T")[0]}</p>
                        <div className="flex justify-between items-center">
                            <div 
                                onClick={() => navigate(`/admin/companies/${job._id}`)} 
                                className="flex items-center gap-2 text-blue-500 cursor-pointer hover:underline"
                            >
                                <Edit2 className='w-4 h-4' />
                                <span>Edit</span>
                            </div>
                            <div 
                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                className="flex items-center gap-2 text-green-500 cursor-pointer hover:underline"
                            >
                                <Eye className='w-4 h-4' />
                                <span>Applicants</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default JobsTable
