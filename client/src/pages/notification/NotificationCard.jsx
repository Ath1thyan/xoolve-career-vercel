import React from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NotificationCard = ({ notification, setUnseenNotifications, setSeenNotifications, unseenNotifications, seenNotifications }) => {
    const USER_API_END_POINT = "xoolve-career-vercel.vercel.app/api/v1/user";
    const navigate = useNavigate();

    const markAsSeen = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(`${USER_API_END_POINT}/notifications/mark-seen/${notification._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            setUnseenNotifications(prev => prev.filter(n => n._id !== notification._id));
            setSeenNotifications(prev => [...prev, notification]);
        } catch (error) {
            console.error("Error marking notification as seen:", error);
        }
    };

    const deleteNotification = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${USER_API_END_POINT}/notifications/delete/${notification._id}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            setUnseenNotifications(prev => prev.filter(n => n._id !== notification._id));
            setSeenNotifications(prev => prev.filter(n => n._id !== notification._id));
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    const handleClick = () => {
        if (notification.clickPath) {
            console.log("Navigating to:", notification.clickPath);
            navigate(notification.clickPath);
        } else {
            console.warn("Notification clickPath is undefined");
            // Optionally, handle the case where clickPath is missing
            // For example, you might redirect to a default page or show a message
            navigate('/notifications'); // Redirect to a default path if needed
        }
    };

    console.log("Notification Data:", notification); // Debug notification data

    return (
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 mt-6 rounded-lg shadow-xl flex justify-between items-center">
            <div
                onClick={handleClick}
                className="flex-1 cursor-pointer"
            >
                <p className="text-white font-semibold">{notification.message}</p>
                <p className="text-sm text-gray-200">{new Date(notification.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex space-x-2">
                {!notification.seen && (
                    <button
                        onClick={markAsSeen}
                        className="bg-green-600 text-white px-3 py-2 rounded-full hover:bg-green-700 flex items-center space-x-1"
                    >
                        <FaCheckCircle className="mr-1" />
                        <span>Seen</span>
                    </button>
                )}
                <button
                    onClick={deleteNotification}
                    className="bg-red-600 text-white px-3 py-2 rounded-full hover:bg-red-700 flex items-center space-x-1"
                >
                    <FaTrashAlt className="mr-1" />
                    <span>Delete</span>
                </button>
            </div>
        </div>
    );
};

export default NotificationCard;
