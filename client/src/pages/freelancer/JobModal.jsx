import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '../../redux/jobSlice';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../../utils/constant';
import { toast } from 'react-hot-toast';

const JobModal = ({ isOpen, onClose, jobId }) => {
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.user);
  const [isApplied, setIsApplied] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      const fetchSingleJob = async () => {
        try {
          const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
          if (res.data.success) {
            dispatch(setSingleJob(res.data.job));
            setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchSingleJob();
    }
  }, [isOpen, jobId, dispatch, user?._id]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" 
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <div className="absolute top-2 right-2">
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-gray-800"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">{singleJob?.title || 'Job Title'}</h1>
            <div className="flex items-center gap-2 mt-4">
              <div className="text-blue-700 font-bold">{singleJob?.position || 'Position'} Positions</div>
              <div className="text-[#F83002] font-bold">{singleJob?.jobType || 'Job Type'}</div>
              <div className="text-[#7209b7] font-bold">{singleJob?.salary || 'Salary'}LPA</div>
            </div>
          </div>
          <button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg py-2 px-4 text-white font-bold transition duration-200 ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'}`}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
        <div className="my-4">
          <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title || 'Role Description'}</span></h1>
          <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location || 'Location'}</span></h1>
          <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description || 'Job Description'}</span></h1>
          <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel || 'Experience'} yrs</span></h1>
          <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary || 'Salary'}LPA</span></h1>
          <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length || 0}</span></h1>
          <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt?.split("T")[0] || 'Posted Date'}</span></h1>
        </div>
        <button onClick={onClose} className="w-full mt-4 bg-gradient-to-l from-purple-500 to-pink-500 text-white py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-200">
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default JobModal;
