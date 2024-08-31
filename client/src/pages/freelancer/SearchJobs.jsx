import React from 'react';
import Layout from '../../components/Layout';
import Jobs from './Jobs';
import useGetAllJobs from '../../hooks/useGetAllJobs';
import JobsFilterCard from './JobsFilterCard';

const SearchJobs = () => {
  useGetAllJobs(); // Ensure this hook is called to fetch jobs

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="w-full md:w-3/4">
          <Jobs />
        </div>
        <div className="w-full md:w-1/4">
          <JobsFilterCard />
        </div>
      </div>
    </Layout>
  );
};

export default SearchJobs;
