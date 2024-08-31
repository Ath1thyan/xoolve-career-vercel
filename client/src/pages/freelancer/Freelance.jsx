import React from 'react'
import Layout from '../../components/Layout'
import Projects from './Projects'
import ProjectsFilterCard from './ProjectsFilterCard'
import useGetAllProjects from '../../hooks/useGetAllProjects'

const Freelance = () => {
	useGetAllProjects();

	return (
		<Layout>
			<div className="flex flex-col md:flex-row justify-between gap-10">
				<div className="w-full md:w-3/4">
					<Projects />
				</div>
				<div className="w-full md:w-1/4">
					<ProjectsFilterCard />
				</div>
			</div>
		</Layout>
	)
}

export default Freelance;
