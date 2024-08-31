import React, { useEffect, useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import JobsTable from './JobsTable';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '../../redux/jobSlice';
import Layout from '../../components/Layout';
import { Briefcase } from 'lucide-react';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <Layout>
      <div className="h-[90vh]">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between my-8 bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-3">
              <Briefcase className="h-8 w-8 text-indigo-600" />
              <Input
                className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                placeholder="Filter by name, role"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <Button
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              onClick={() => navigate("/admin/jobs/create")}
            >
              <span className="font-semibold">+ New Job</span>
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <JobsTable />
          </div>
        </div>
      </div>
    </Layout>

  );
}

export default AdminJobs;
