import React, { useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { MESSAGE_API_END_POINT } from '../utils/constant';

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages = async () => {
            const token = localStorage.getItem('token');
            if (selectedUser?._id) {
                try {
                    axios.defaults.withCredentials = true;
                    const res = await axios.get(`${MESSAGE_API_END_POINT}/${selectedUser._id}`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                            withCredentials: true,
                        },
                    );
                    dispatch(setMessages(res.data));
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchMessages();
    }, [selectedUser?._id, dispatch]);
};

export default useGetMessages;
