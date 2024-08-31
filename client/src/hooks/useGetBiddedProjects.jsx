import { setAllBiddedProjects } from "../redux/projectSlice";
import { BID_API_END_POINT } from "../utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetBiddedProjects = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchBiddedProjects = async () => {
            try {
                const res = await axios.get(`${BID_API_END_POINT}/get`, {withCredentials:true});
                console.log(res.data);
                if(res.data.success){
                    dispatch(setAllBiddedProjects(res.data.bid));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchBiddedProjects();
    },[])
};
export default useGetBiddedProjects;