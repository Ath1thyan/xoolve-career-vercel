import React, { useEffect, useState } from 'react';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery && typeof searchedQuery === 'string') {
      const lowerCaseQuery = searchedQuery.toLowerCase();
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(lowerCaseQuery) ||
          job.description.toLowerCase().includes(lowerCaseQuery) ||
          job.location.toLowerCase().includes(lowerCaseQuery)
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5">
        {filterJobs.length <= 0 ? (
          <span className="text-gray-500">No jobs found</span>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="flex flex-col gap-6">  {/* Updated to flex-col for column layout */}
              {filterJobs.map((job) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  key={job?._id}
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
