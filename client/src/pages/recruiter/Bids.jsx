import React, { useEffect } from 'react';
import BidsTable from './BidsTable';  // Assuming you still want to use the table version
import axios from 'axios';
import { BID_API_END_POINT } from '../../utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '../../redux/bidSlice';
import Layout from '../../components/Layout';
import { Users } from 'lucide-react';

const Bids = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.bid);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllApplicants = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(`${BID_API_END_POINT}/${params.id}/applicants`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                dispatch(setAllApplicants(res.data.project));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [dispatch, params.id]);

    return (
        <Layout>
            <div className='min-h-screen max-w-7xl mx-auto py-10'>
                <div className='flex items-center justify-between mb-8'>
                    <div className='flex items-center gap-2'>
                        <Users className='h-8 w-8 text-purple-600' />
                        <h1 className='text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text'>
                            Bids <span className='text-gray-600'>({applicants?.bids?.length})</span>
                        </h1>
                    </div>
                    <button 
                    onClick={() => navigate('/admin/projects')} 
                    className='px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300'>
                        View all projects
                    </button>
                </div>
                <div className='bg-white p-6 rounded-lg shadow-lg'>
                    <BidsTable />
                </div>
            </div>
        </Layout>
    );
}

export default Bids;
