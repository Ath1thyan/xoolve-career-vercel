import { setAllProjects } from '../redux/projectSlice'
import { PROJECT_API_END_POINT } from '../utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllProjects = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.project);
    useEffect(()=>{
        const fetchAllProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${PROJECT_API_END_POINT}/get?keyword=${searchedQuery}`,{
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });

                console.log('All Projects API Response:', res.data);
                if(res.data.success){
                    dispatch(setAllProjects(res.data.projects));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllProjects();
    },[searchedQuery])
}

export default useGetAllProjects;