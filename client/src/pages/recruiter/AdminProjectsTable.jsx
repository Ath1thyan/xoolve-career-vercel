import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Avatar, AvatarImage } from '../../components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminProjectsTable = () => { 
    const {allAdminProjects, searchProjectByText} = useSelector(store=>store.project);

    const [filterProjects, setFilterProjects] = useState(allAdminProjects);
    const navigate = useNavigate();

    useEffect(()=>{ 
        console.log('called');
        const filteredProjects = allAdminProjects.filter((project)=>{
            if(!searchProjectByText){
                return true;
            };
            return project?.title?.toLowerCase().includes(searchProjectByText.toLowerCase()) || project?.company?.name.toLowerCase().includes(searchProjectByText.toLowerCase());

        });
        setFilterProjects(filteredProjects);
    },[allAdminProjects,searchProjectByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent  posted Projects</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterProjects?.map((projectc) => (
                            <tr>
                                <TableCell>{projectc?.company?.name}</TableCell>
                                <TableCell>{projectc?.title}</TableCell>
                                <TableCell>{projectc?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/companies/${projectc._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=> navigate(`/admin/projects/${projectc._id}/bids`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4'/>
                                                <span>Bids</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminProjectsTable