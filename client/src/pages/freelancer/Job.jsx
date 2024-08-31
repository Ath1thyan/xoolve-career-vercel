import React, { useState } from 'react';
import { FaBookmark, FaBriefcase, FaMoneyBillWave, FaBuilding } from 'react-icons/fa';
import { motion } from 'framer-motion';
import JobModal from './JobModal';
import companyLogo from "../../assets/company-logo.png"

const Job = ({ job }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <motion.div className="p-4 rounded-lg shadow-md bg-white border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <p className="text-gray-400 text-sm">
          {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
      </div>

      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-800 mb-3">{job?.title}</h1>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job?.description}</p>

          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <FaBriefcase /> {job?.position || 1} Position
            </span>
            <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              {job?.jobType}
            </span>
            <span className="bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <FaMoneyBillWave /> {job?.salary || '0'} LPA
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <h2 className="font-semibold text-lg text-gray-800">{job?.company?.name}</h2>
            <p className="text-gray-500 text-sm flex items-center justify-end gap-1">
              <FaBuilding className="text-purple-500" /> {job?.location || 'India'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
            <img
              src={job?.company?.logo || `${companyLogo}`}
              alt={job?.company?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={openModal}
          className="w-full py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white rounded-lg shadow hover:shadow-md transition duration-200"
        >
          View Details
        </button>
        <button className="w-full py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white rounded-lg shadow hover:shadow-md transition duration-200">
          Save
        </button>
      </div>
      <JobModal isOpen={isModalOpen} onClose={closeModal} jobId={job._id} />
    </motion.div>
  );
};

export default Job;
