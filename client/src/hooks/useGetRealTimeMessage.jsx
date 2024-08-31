import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector(store => store.socket);
    const dispatch = useDispatch();

    useEffect(() => {
        if (socket) {
            const handleMessage = (newMessage) => {
                dispatch(setMessages(prevMessages => [...prevMessages, newMessage]));
            };

            socket.on('newMessage', handleMessage);

            return () => {
                socket.off('newMessage', handleMessage);
            };
        }
    }, [socket, dispatch]);
};

export default useGetRealTimeMessage;
