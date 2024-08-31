import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleProject } from '../../redux/projectSlice';
import axios from 'axios';
import { BID_API_END_POINT, PROJECT_API_END_POINT } from '../../utils/constant';
import { toast } from 'react-hot-toast';

const ProjectModal = ({ isOpen, onClose, projectId }) => {
  const dispatch = useDispatch();
  const { singleProject } = useSelector((store) => store.project);
  const { user } = useSelector((store) => store.user);
  const [isBidded, setIsBidded] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      const fetchSingleProject = async () => {
        try {
          const res = await axios.get(`${PROJECT_API_END_POINT}/get/${projectId}`, { withCredentials: true });
          if (res.data.success) {
            dispatch(setSingleProject(res.data.project));
            setIsBidded(res.data.project.bids.some(bid => bid.applicant === user?._id));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchSingleProject();
    }
  }, [isOpen, projectId, dispatch, user?._id]);

  const bidProjectHandler = async () => {
    try {
      const res = await axios.get(`${BID_API_END_POINT}/apply/${projectId}`, { withCredentials: true });
      if (res.data.success) {
        setIsBidded(true);
        const updatedSingleProject = { ...singleProject, bids: [...singleProject.bids, { applicant: user?._id }] };
        dispatch(setSingleProject(updatedSingleProject));
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
            <h1 className="font-bold text-xl">{singleProject?.title || 'Project Title'}</h1>
            <div className="flex items-center gap-2 mt-4">
              <div className="text-[#F83002] font-bold">{singleProject?.duration || 'Duration'}</div>
              <div className="text-[#7209b7] font-bold">{singleProject?.budget || 'Budget'}</div>
            </div>
          </div>
          <button
            onClick={isBidded ? null : bidProjectHandler}
            disabled={isBidded}
            className={`rounded-lg py-2 px-4 text-white font-bold transition duration-200 ${isBidded ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'}`}
          >
            {isBidded ? 'Already Raised Bid' : 'Bid Now'}
          </button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Project Description</h1>
        <div className="my-4">
          <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">{singleProject?.title || 'Role Description'}</span></h1>
          <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{singleProject?.location || 'Location'}</span></h1>
          <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{singleProject?.description || 'Project Description'}</span></h1>
          <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">{singleProject?.duration || 'Duration'} </span></h1>
          <h1 className="font-bold my-1">Budget: <span className="pl-4 font-normal text-gray-800">{singleProject?.budget || 'Budget'}</span></h1>
          <h1 className="font-bold my-1">Total Bids: <span className="pl-4 font-normal text-gray-800">{singleProject?.bids?.length || 0}</span></h1>
          <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">{singleProject?.createdAt?.split("T")[0] || 'Posted Date'}</span></h1>
        </div>
        <button onClick={onClose} className="w-full mt-4 bg-gradient-to-l from-purple-500 to-pink-500 text-white py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-200">
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;
