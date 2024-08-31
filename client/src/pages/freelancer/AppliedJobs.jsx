import React from 'react'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '../../hooks/useGetAppliedJobs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { MdWork } from 'react-icons/md'
import { FaBuilding } from 'react-icons/fa'
import { BsCircleFill } from 'react-icons/bs'
import { format } from 'date-fns'

const AppliedJobs = () => {
	useGetAppliedJobs();

	const { allAppliedJobs } = useSelector(store => store.job);

	return (
		<Layout>
			<div className="h-[85vh] p-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-lg shadow-lg flex flex-col">
				<div className="mb-6 bg-black bg-opacity-40 pb-3 mt-2 mx-52 rounded-xl">
					<h2 className="text-3xl font-bold text-white pt-4 text-center">Monitor the status of your Job Applications</h2>
				</div>
				<div className="flex-1 flex flex-col items-center justify-start pt-8 overflow-y-auto">
					{
						allAppliedJobs.length <= 0 ?
							<div className="text-center text-white font-semibold">
								{`You haven't applied for any job yet`}
							</div> :
							allAppliedJobs.map((appliedJob) => (
								<div key={appliedJob?._id} className="bg-white p-4 mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-full max-w-4xl">
									<div className="flex items-center justify-between">
										<div className="flex items-center">
											<AiOutlineClockCircle className="text-purple-500 mr-2" />
											<div>{format(new Date(appliedJob?.createdAt), 'MMM dd, yyyy')}</div>
										</div>
										<div className="flex items-center">
											<MdWork className="text-blue-500 mr-2" />
											<div className="font-semibold">{appliedJob?.job?.title}</div>
										</div>
									</div>
									<div className="flex items-center mt-2">
										<FaBuilding className="text-green-500 mr-2" />
										<div>{appliedJob?.job?.company?.name}</div>
									</div>
									<div className="mt-2">
										Status: <span className={`inline-flex items-center ${appliedJob.status === 'pending' ? 'text-yellow-500' : appliedJob.status === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
											<BsCircleFill className="mr-1" /> {appliedJob.status}
										</span>
									</div>
								</div>
							))
					}
				</div>
			</div>
		</Layout>
	)
}

export default AppliedJobs
