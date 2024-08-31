import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Message = ({ message }) => {
    const scroll = useRef();
    const { user, selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    const isSentByUser = message?.senderId === user?._id;

    return (
        <div ref={scroll} className={`flex ${isSentByUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`flex ${isSentByUser ? 'flex-row-reverse' : 'flex-row'} items-end`}>
                <div className="chat-image avatar mb-[2px]">
                    <div className="w-10 rounded-full">
                        <img 
                            alt="" 
                            src={
                                isSentByUser 
                                ? user?.profile?.profilePhoto || `https://avatar.iran.liara.run/public/boy/`
                                : selectedUser?.profile?.profilePhoto || `https://avatar.iran.liara.run/public/boy/`
                            } 
                        />
                    </div>
                </div>
                <div className={`max-w-xs md:max-w-sm lg:max-w-md px-4 py-2 rounded-lg shadow-lg ${isSentByUser ? 'bg-blue-600 mr-2 text-white' : 'bg-slate-200 text-black ml-2'}`}>
                    <div className="chat-header text-sm font-semibold mb-1">
                        {isSentByUser ? 'You' : `${selectedUser?.firstName} ${selectedUser?.lastName}`}
                    </div>
                    <div className="chat-bubble text-sm">
                        {message?.message}
                    </div>
                    <time className="text-xs opacity-50 block mt-1 text-right">
                    {moment(message?.createdAt).format('hh:mm A')}
                </time>
                </div>
            </div>
        </div>
    );
};

export default Message;
