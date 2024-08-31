import React, { useEffect, useState } from 'react';
import Project from './Project';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Projects = () => {
  const { allProjects, searchedQuery } = useSelector((store) => store.project);
  const [filterProjects, setFilterProjects] = useState(allProjects);

  useEffect(() => {
    if (searchedQuery && typeof searchedQuery === 'string') {
      const lowerCaseQuery = searchedQuery.toLowerCase();
      const filteredProjects = allProjects.filter((project) => {
        return (
            project.title.toLowerCase().includes(lowerCaseQuery) ||
            project.description.toLowerCase().includes(lowerCaseQuery) ||
            project.location.toLowerCase().includes(lowerCaseQuery)
        );
      });
      setFilterProjects(filteredProjects);
    } else {
      setFilterProjects(allProjects);
    }
  }, [allProjects, searchedQuery]);

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5">
        {filterProjects.length <= 0 ? (
          <span className="text-gray-500">No Projects found</span>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="flex flex-col gap-6">  {/* Updated to flex-col for column layout */}
              {filterProjects.map((project) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  key={project?._id}
                >
                  <Project project={project} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;