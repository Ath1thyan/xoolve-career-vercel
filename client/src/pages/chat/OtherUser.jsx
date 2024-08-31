import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../../redux/userSlice';

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(user._id);

    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    };

    return (
        <>
            <div
                onClick={() => selectedUserHandler(user)}
                className={`${selectedUser?._id === user?._id ? 'bg-purple-400 text-black' : 'text-black'
                    } flex gap-2 hover:text-black items-center hover:bg-gradient-to-r from-purple-300 via-pink-400 to-pink-500 rounded-xl p-2 cursor-pointer`}
            >
                <div className="relative">
                    <div className={`avatar ${isOnline ? 'online' : ''}`}>
                        <div className="w-12 rounded-full">
                            <img
                                src={
                                    user?.profile?.profilePhoto
                                        ? user?.profile?.profilePhoto
                                        : `https://avatar.iran.liara.run/public/boy/username?username=${user?.firstName}`
                                }
                                alt="user-profile"
                            />
                        </div>
                    </div>
                    {/* Badge */}
                    <span
                        className={`absolute top-0 right-0 w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'
                            } border-2 border-white`}
                    ></span>
                </div>
                <div className="flex flex-col flex-1">
                    <div className="flex justify-between gap-2">
                        <p>{user?.firstName} {user?.lastName}</p>
                    </div>
                </div>
            </div>
            <div className="divider my-0 py-0 h-1"></div>
        </>
    );
};

export default OtherUser;
