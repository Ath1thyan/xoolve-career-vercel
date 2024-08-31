import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useSelector } from 'react-redux';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { FaShareAlt, FaSearch, FaUserFriends, FaEnvelopeOpen, FaEnvelope } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import UserProfileModal from './UserProfileModal';

const MyNetwork = () => {
    // Fetch other users when the component mounts
    useGetOtherUsers();

    // Access the other users data from the Redux store
    const otherUsers = useSelector((store) => store.user.otherUsers);

    // State for search query and showing more users
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleUsers, setVisibleUsers] = useState(4);

    // State to manage which user's profile modal is open
    const [selectedUser, setSelectedUser] = useState(null);

    // Handle search functionality
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter users based on search query
    const filteredUsers = otherUsers?.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Show more users on clicking "See more"
    const handleShowMore = () => {
        setVisibleUsers(prevVisibleUsers => prevVisibleUsers + 4);
    };

    // Open modal with selected user
    const openModal = (user) => {
        setSelectedUser(user);
    };

    // Close modal
    const closeModal = () => {
        setSelectedUser(null);
    };

    return (
        <Layout>
            <div className="p-6 pl-10 bg-purple-50 min-h-screen">
                <h1 className="text-3xl font-extrabold mb-10 text-purple-700 bg-clip-text p-2 rounded-lg">
                    My Network
                </h1>

                {/* Search box */}
                <div className="flex items-center mb-6 ml-28">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 w-2/4 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg placeholder-gray-400 text-gray-700"
                    />
                    <FaSearch className="ml-3 text-gray-500 text-xl transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer" />
                </div>

                {/* Buttons with badges */}
                <div className="flex gap-8 ml-28 mb-10">
                    <button className="bg-white py-3 px-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none hover:bg-purple-100 flex items-center gap-2">
                        <FaUserFriends className="text-purple-600 text-xl" />
                        My Connection
                        {/* Example badge for notifications */}
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-2">5</span>
                    </button>
                    <button className="bg-white py-3 px-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none hover:bg-purple-100 flex items-center gap-2">
                        <FaEnvelopeOpen className="text-purple-600 text-xl" />
                        Invitation Received
                        {/* Example badge for notifications */}
                        <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 ml-2">3</span>
                    </button>
                    <button className="bg-white py-3 px-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none hover:bg-purple-100 flex items-center gap-2">
                        <FaEnvelope className="text-purple-600 text-xl" />
                        Invitation Sent
                        {/* Example badge for notifications */}
                        <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 ml-2">2</span>
                    </button>
                </div>

                {/* User List */}
                <div className="space-y-6 w-3/4">
                    {filteredUsers?.length ? (
                        filteredUsers?.slice(0, visibleUsers).map((user) => (
                            <div
                                key={user._id}
                                className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center transition-transform duration-300 transform hover:scale-105"
                            >
                                <div className="flex items-center gap-6">
                                    <LazyLoadImage
                                        src={user?.profile?.profilePhoto || "/default-profile.png"}
                                        alt={user.firstName}
                                        className="w-16 h-16 rounded-full object-cover"
                                        effect="blur"  // Apply the blur effect
                                    />
                                    <div>
                                        <h3 className="font-semibold text-xl text-gray-800">{user?.firstName} {user?.lastName}</h3>
                                        <p className="text-gray-600">{user?.profile?.bio}</p>
                                        <p className="text-gray-600">
                                            <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">{user?.email}</span>
                                            &nbsp;&nbsp;
                                            <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">{user?.phoneNumber}</span>
                                            &nbsp;&nbsp;
                                            <span className={`inline-block ${user?.role === 'recruiter' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'} px-2 py-1 rounded-full text-sm`}>
                                                {user?.role}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-8">
                                        <FaShareAlt className="text-gray-500 hover:text-blue-500 cursor-pointer transition-colors duration-300" />
                                        <a
                                            onClick={() => openModal(user)} // Open modal for specific user
                                            className="text-blue-600 hover:underline font-medium cursor-pointer"
                                        >
                                            View Profile
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-600">
                            <p>No users found matching your search criteria.</p>
                        </div>
                    )}
                </div>

                {visibleUsers < filteredUsers?.length && (
                    <div className="mt-8 text-center w-3/4">
                        <button
                            onClick={handleShowMore}
                            className="text-blue-600 hover:underline text-lg focus:outline-none">
                            See more
                        </button>
                    </div>
                )}

                {/* Render UserProfileModal only if a user is selected */}
                {selectedUser && (
                    <UserProfileModal
                        isOpen={!!selectedUser}
                        onClose={closeModal}
                        user={selectedUser}
                    />
                )}
            </div>
        </Layout>
    );
};

export default MyNetwork;
