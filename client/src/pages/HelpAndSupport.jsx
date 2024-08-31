import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FaPhoneAlt, FaCommentDots } from 'react-icons/fa';
import { TbAlertTriangleFilled } from "react-icons/tb";

const HelpAndSupport = () => {
    const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
    const [isCallModalOpen, setIsCallModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    const closeModal = () => {
        setIsSOSModalOpen(false);
        setIsCallModalOpen(false);
        setIsReportModalOpen(false);
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };

    return (
        <Layout>
            <div className="h-[90vh] flex items-center justify-center">
                <div className="px-4 pb-24 text-center">
                    <h1 className="text-5xl font-extrabold text-gray-900 tracking-wide bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-12">
                        Help and Support
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div
                            onClick={() => setIsSOSModalOpen(true)}
                            className="relative bg-gradient-to-br from-red-500 to-red-700 text-white rounded-lg shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-shadow cursor-pointer transform hover:-translate-y-1"
                        >
                            <TbAlertTriangleFilled className="text-5xl mb-4 animate-bounce" />
                            <h2 className="text-2xl font-semibold tracking-wide transform transition-transform duration-300 hover:scale-110">
                                SOS
                            </h2>
                            <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg opacity-0 hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div
                            onClick={() => setIsCallModalOpen(true)}
                            className="relative bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-lg shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-shadow cursor-pointer transform hover:-translate-y-1"
                        >
                            <FaPhoneAlt className="text-5xl mb-4 animate-pulse" />
                            <h2 className="text-2xl font-semibold tracking-wide transform transition-transform duration-300 hover:scale-110">
                                Get a Call from Us
                            </h2>
                            <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg opacity-0 hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div
                            onClick={() => setIsReportModalOpen(true)}
                            className="relative bg-gradient-to-br from-green-500 to-green-700 text-white rounded-lg shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-shadow cursor-pointer transform hover:-translate-y-1"
                        >
                            <FaCommentDots className="text-5xl mb-4 animate-bounce" />
                            <h2 className="text-2xl font-semibold tracking-wide transform transition-transform duration-300 hover:scale-110">
                                Report/Query
                            </h2>
                            <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg opacity-0 hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                </div>

                {/* SOS Modal */}
                {isSOSModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 modal-overlay bg-black bg-opacity-50" onClick={handleOutsideClick}>
                        <div className="bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow-lg p-8 max-w-lg mx-auto">
                            <div className="flex items-center mb-4">
                                <TbAlertTriangleFilled className="text-4xl mr-2" />
                                <h2 className="text-2xl font-semibold">Emergency Contact Details</h2>
                            </div>
                            <p className="text-lg">For emergencies, contact us at:</p>
                            <p className="text-2xl font-bold mt-2">+1 800 123 4567</p>
                            <p className="text-lg mt-1">Available 24/7</p>
                            <button
                                onClick={closeModal}
                                className="mt-6 w-full bg-white text-red-700 font-bold p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* Get a Call Modal */}
                {isCallModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 modal-overlay bg-black bg-opacity-50" onClick={handleOutsideClick}>
                        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg shadow-lg p-8 max-w-xl mx-auto">
                            <div className="flex items-center mb-4">
                                <FaPhoneAlt className="text-4xl mr-2" />
                                <h2 className="text-2xl font-semibold">Request a Call</h2>
                            </div>
                            <div className="mb-4">
                                <label className="block text-white mb-2">Mobile Number:</label>
                                <input type="tel" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200" placeholder="Enter your mobile number" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white mb-2">Reason for Call:</label>
                                <textarea className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200" placeholder="Enter your query"></textarea>
                            </div>
                            <button
                                className="w-full bg-white text-purple-700 font-bold p-3 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Request Call
                            </button>
                            <button
                                onClick={closeModal}
                                className="mt-4 w-full bg-white text-purple-700 font-bold p-3 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* Report/Query Modal */}
                {isReportModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 modal-overlay bg-black bg-opacity-50" onClick={handleOutsideClick}>
                        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-lg p-8 max-w-xl mx-auto">
                            <div className="flex items-center mb-4">
                                <FaCommentDots className="text-4xl mr-2" />
                                <h2 className="text-2xl font-semibold">Report/Query</h2>
                            </div>
                            <div className="mb-4">
                                <label className="block text-white mb-2">Subject:</label>
                                <input type="text" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200" placeholder="Enter the subject" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white mb-2">Detailed Report/Query:</label>
                                <textarea className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200" placeholder="Enter your report or query"></textarea>
                            </div>
                            <button
                                className="w-full bg-white text-green-700 font-bold p-3 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Send
                            </button>
                            <button
                                onClick={closeModal}
                                className="mt-4 w-full bg-white text-green-700 font-bold p-3 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default HelpAndSupport;
