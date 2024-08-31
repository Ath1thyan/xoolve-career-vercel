import { setCompanies } from '../redux/companySlice';
import { COMPANY_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    headers: {
                        Authorization: `Bearer ${token}` },  // Add token to headers for authenticated requests
                    withCredentials: true });
                console.log('API Response:', res.data);  // Log the entire response
                if (res.data.success) {
                    console.log('Dispatching companies:', res.data.companies);  // Log companies before dispatching
                    dispatch(setCompanies(res.data.companies));  // Dispatch the companies to Redux store
                }
            } catch (error) {
                console.log('API Error:', error);
            }
        };

        fetchCompanies();
    }, [dispatch]);
};

export default useGetAllCompanies;
