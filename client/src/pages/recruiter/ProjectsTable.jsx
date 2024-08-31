import React, { useEffect, useState } from 'react'
import { Edit2, Eye } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProjectsTable = () => { 
    const { allAdminProjects, searchProjectByText } = useSelector(store => store.project);
    const [filterProjects, setFilterProjects] = useState(allAdminProjects);
    const navigate = useNavigate();

    useEffect(() => { 
        const filteredProjects = allAdminProjects.filter((project) => {
            if (!searchProjectByText) {
                return true;
            }
            return project?.title?.toLowerCase().includes(searchProjectByText.toLowerCase()) || project?.company?.name.toLowerCase().includes(searchProjectByText.toLowerCase());
        });
        setFilterProjects(filteredProjects);
    }, [allAdminProjects, searchProjectByText]);

    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-5">Recent Posted Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filterProjects?.map((project) => (
                    <div key={project._id} className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{project?.company?.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{project?.title}</p>
                        <p className="text-xs text-gray-400 mb-4">Posted on: {project?.createdAt.split("T")[0]}</p>
                        <div className="flex justify-between items-center">
                            <div 
                                onClick={() => navigate(`/admin/companies/${project._id}`)} 
                                className="flex items-center gap-2 text-blue-500 cursor-pointer hover:underline"
                            >
                                <Edit2 className='w-4 h-4' />
                                <span>Edit</span>
                            </div>
                            <div 
                                onClick={() => navigate(`/admin/projects/${project._id}/bids`)} 
                                className="flex items-center gap-2 text-green-500 cursor-pointer hover:underline"
                            >
                                <Eye className='w-4 h-4' />
                                <span>Bids</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProjectsTable
