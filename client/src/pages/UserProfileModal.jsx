import React, { useRef, useEffect } from 'react';
import { FaUserPlus, FaEnvelope, FaPhoneAlt, FaRegEnvelope } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { HiUser } from 'react-icons/hi';

const UserProfileModal = ({ isOpen, onClose, user }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSendMessage = () => {
        // navigate(`/chat/${user?._id}`); // Uncomment and update navigation logic as needed
        console.log('Navigate to chat page with user ID:', user?._id);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
            <div
                ref={modalRef}
                className="bg-white p-7 rounded-lg shadow-lg w-full max-w-md relative"
            >
                <button onClick={onClose} className="absolute top-2 right-5 text-gray-500 text-2xl hover:text-gray-800">
                    ×
                </button>

                {/* User Profile Picture */}
                <div className="flex justify-center mb-4">
                    <img
                        src={user?.profile?.profilePhoto || '/default-profile.png'}
                        alt={`${user?.firstName} ${user?.lastName}`}
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
                    />
                </div>

                <h2 className="text-2xl font-bold mb-2 text-center">{user?.firstName} {user?.lastName}</h2>
                <p className="text-gray-600 mt-2">{user?.profile?.bio}</p>

                {/* User Information */}
                <div className="text-center mb-6 mt-6">
                    <p className="text-gray-600 mb-2 mx-4 flex flex-row justify-between">
                        <span className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                            <FaRegEnvelope /> {user?.email}
                        </span>
                        <span className="bg-green-100 text-green-500 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                            <FaPhoneAlt /> {user?.phoneNumber || "999-9999-999"}
                        </span>
                    </p>
                    <p className="text-gray-600 mt-4 mb-4 flex items-center justify-center gap-2">
                        <HiUser className="text-purple-500" />
                        <span className="text-lg font-medium bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                            {user?.role}
                        </span>
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={() => console.log('Connect functionality here')} // Replace with actual connect logic
                        className="flex-1 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                    >
                        <FaUserPlus /> Connect
                    </button>
                    <button
                        onClick={handleSendMessage}
                        className="flex-1 py-2 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                    >
                        <FaMessage /> Send Message
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfileModal;
