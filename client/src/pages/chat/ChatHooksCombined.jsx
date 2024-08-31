import React, { useEffect } from 'react';
import useGetMessages from '../../hooks/useGetMessages';
import useGetRealTimeMessage from '../../hooks/useGetRealTimeMessage';
import { useSelector } from 'react-redux';

const Chat = () => {
    useGetMessages(); // Fetch initial messages
    useGetRealTimeMessage(); // Handle real-time message updates

    const { messages } = useSelector((store) => store.message);

    return (
        <div>
            {messages.map((msg, index) => (
                <div key={index}>{msg.text}</div>
            ))}
        </div>
    );
};

export default Chat;
