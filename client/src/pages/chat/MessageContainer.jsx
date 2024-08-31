import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages.jsx';
import { useSelector,useDispatch } from "react-redux";
import { setSelectedUser } from '../../redux/userSlice';

const MessageContainer = () => {
    const { selectedUser, user, onlineUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id);
   
    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='md:min-w-[550px] flex-1 flex flex-col bg-gradient-to-b from-purple-200 via-lavender-200 to-pink-200 '>
                        <div className='flex gap-2 items-center bg-slate-800 text-white px-4 py-3 mb-2'>
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-10 rounded-full'>
                                    <img src={
                                    user?.profile?.profilePhoto
                                        ? user?.profile?.profilePhoto
                                        : `https://avatar.iran.liara.run/public/boy/`
                                } alt="user-profile" />
                                </div>
                            </div>
                            
                            <div className='flex flex-col flex-1'>
                                <div className='flex text-lg justify-between gap-2'>
                                    <p>{selectedUser?.firstName} {selectedUser?.lastName}</p>
                                </div>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    <div className='md:min-w-[550px] ml-32 mb-10 flex flex-col justify-center items-center'>
                        <h1 className='text-4xl text-purple-500 font-bold'>Hi, {user?.firstName} </h1>
                        <h1 className='text-2xl text-gray-700'>Lets start conversation</h1>

                    </div>
                )
            }
        </>

    )
}

export default MessageContainer