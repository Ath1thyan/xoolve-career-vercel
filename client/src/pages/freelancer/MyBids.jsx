import React from 'react'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux'
import useGetBiddedProjects from '../../hooks/useGetBiddedProjects'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { MdWork } from 'react-icons/md'
import { FaBuilding } from 'react-icons/fa'
import { BsCircleFill } from 'react-icons/bs'
import { format } from 'date-fns'

const MyBids = () => {
	useGetBiddedProjects();

	const { allBiddedProjects } = useSelector(store => store.project);

	return (
		<Layout>
			<div className="h-[85vh] p-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-lg shadow-lg flex flex-col">
				<div className="mb-6 bg-black bg-opacity-40 pb-3 mx-52 rounded-xl">
					<h2 className="text-3xl font-bold text-white pt-4 text-center">Monitor the status of your Bids</h2>
				</div>
				<div className="flex-1 flex flex-col items-center justify-start pt-8 overflow-y-auto">
					{
						allBiddedProjects.length <= 0 ?
							<div className="text-center text-white font-semibold">
								{`You haven't raised any bid yet`}
							</div> :
							allBiddedProjects.map((biddedProject) => (
								<div key={biddedProject?._id} className="bg-white p-4 mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-full max-w-4xl">
									<div className="flex items-center justify-between">
										<div className="flex items-center">
											<AiOutlineClockCircle className="text-purple-500 mr-2" />
											<div>{format(new Date(biddedProject?.createdAt), 'MMM dd, yyyy')}</div>
										</div>
										<div className="flex items-center">
											<MdWork className="text-blue-500 mr-2" />
											<div className="font-semibold">{biddedProject?.project?.title}</div>
										</div>
									</div>
									<div className="flex items-center mt-2">
										<FaBuilding className="text-green-500 mr-2" />
										<div>{biddedProject?.project?.company?.name}</div>
									</div>
									<div className="mt-2">
										Status: <span className={`inline-flex items-center ${biddedProject.status === 'Pending' ? 'text-yellow-500' : biddedProject.status === 'Accepted' ? 'text-green-500' : 'text-red-500'}`}>
											<BsCircleFill className="mr-1" /> {biddedProject.status}
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

export default MyBids;
