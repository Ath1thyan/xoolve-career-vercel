import { MdAddIcCall } from "react-icons/md";
import Layout from "../../components/Layout";
import { TbMessageChatbot } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import { SlEnvolopeLetter } from "react-icons/sl";
import { IoSearch } from "react-icons/io5";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FaBookOpenReader } from "react-icons/fa6";
import { MdOutlineMenuBook } from "react-icons/md";

const aiArray = [
	{
	  icon: <ImProfile className="text-gray-600 text-[6vh]" />,
	  title: "Resume/CV Builder",
	  description: "Craft a professional resume effortlessly in just minutes. Present your skills and experience with a sleek, modern design.",
	  button: "Create Now",
	  link: "https://www.resumebuilder.com/",
	},
	{
	  icon: <SlEnvolopeLetter className="text-gray-600 text-[6vh] mr-2" />,
	  title: "AI Cover Letter",
	  description: "Generate a compelling cover letter by answering a few simple questions. Land your dream job with a personalized touch.",
	  button: "Get Started",
	  link: "https://zety.com/cover-letter-builder",
	},
	{
	  icon: <TbMessageChatbot className="text-gray-600 text-[6vh]" />,
	  title: "Chatbot",
	  description: "Engage with an intelligent chatbot that provides instant, accurate responses. Perfect for learning, assistance, or just fun.",
	  button: "Chat Now",
	  link: "https://openai.com/chatgpt/",
	},
	{
	  icon: <AiOutlineFileSearch className="text-gray-600 text-[6vh] " />,
	  title: "Job Scraper",
	  description: "Find and apply for your next job opportunity quickly. Let our AI search and deliver the best matches for you.",
	  button: "Discover Jobs",
	  link: "#",
	},
	{
	  icon: <MdOutlineMenuBook className="text-gray-600 text-[6vh]" />,
	  title: "Interview Prep",
	  description: "Prepare for your upcoming interview with targeted questions. Boost your confidence and impress your potential employer.",
	  button: "Start Prep",
	  link: "https://www.themuse.com/advice/interview-questions-and-answers",
	},
  ];
  


const AIPage = () => {
	return (
		<Layout>
			<div className="min-h-[86vh] pb-2 px-4 relative overflow-auto">
				<div className="bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 text-white rounded-md mt-2 py-2 shadow-lg mb-5">
					<h1 className="text-center font-bold text-5xl mb-2">AI Tools</h1>
					<p className="my-2 text-center font-semibold text-lg">
						Use these Tools to get yourself ahead
					</p>
				</div>
				<div className="py-8 px-8 bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 rounded-md min-h-[75vh] overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-16 gap-x-16">
					{aiArray.map((item, index) => (
						<div
							key={index}
							className="bg-white border-black-200 px-6 py-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center justify-around text-center"
						>
							<div className="flex items-center justify-center w-full gap-2 mb-4">
								{item.icon}
								<h3 className="text-3xl font-bold text-gray-800 mt-1">
									{item.title}
								</h3>
							</div>
							<p className="text-gray-600 mb-4">{item.description}</p>
							<a
								className="bg-[#3764cd] hover:bg-[#2a4fa1] text-white text-xl font-semibold w-[80%] py-3 rounded-full transition-colors duration-300"
								href={item.link}
							>
								{item.button}
							</a>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default AIPage;