import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import toast from "react-hot-toast";
import {useSelector, useDispatch} from "react-redux";
import { setOtherUsers  } from '../../redux/userSlice';

const Sidebar = () => {
    const [search, setSearch] = useState("");
    const {otherUsers} = useSelector(store=>store.user);
    const dispatch = useDispatch();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user)=> user.firstName.toLowerCase().includes(search.toLowerCase()));
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]));
        }else{
            toast.error("User not found!");
        }
    }
    return (
        <div className='border-r border-slate-500 p-4 pr-5 w-[25%] flex flex-col bg-gradient-to-r from-purple-200 to-pink-200'>
            <form onSubmit={searchSubmitHandler} action="" className='flex items-center mb-8 gap-2'>
                <input
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className='input input-bordered rounded-full p-3' type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn p-3 rounded-full bg-zinc-700 text-white'>
                    <BiSearchAlt2 className='w-6 h-6 outline-none'/>
                </button>
            </form>
            <div className="divider px-3"></div> 
            <OtherUsers/> 
        </div>
    )
}

export default Sidebar