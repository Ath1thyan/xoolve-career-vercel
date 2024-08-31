/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { LuMonitorCheck } from "react-icons/lu";
import { IoStatsChart } from "react-icons/io5";

function Buttons({ title, link }) {
  return (
    <Link
      to={link}
      //   className="rounded-lg  px-14 py-6 text-xl font-bold text-white"
      className="flex items-center text-lg font-semibold px-10 py-3 rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 text-white transition-transform duration-300 ease-in-out transform hover:scale-105"
    >
      {title}
    </Link>
  );
}

function StatusCards({ icon, val, title }) {
  return (
    <div
      to={"/admin/jobs"}
      className="rounded-lg bg-purple-50 flex flex-col items-center justify-around gap-2 h-[180px] min-w-[150px] px-6 pt-4 pb-2 shadow-md"
    >
      {icon}
      <p className="gradient-text text-4xl font-semibold py-1">{val}</p>
      <p className="text-purple-600 font-semibold">{title}</p>
    </div>
  );
}

const RecruiterProfile = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg mt-4 ">
      <p className="text-3xl font-semibold mb-4">Leaderboard:</p>
      <div className="flex flex-col gap-6 justify-center">
        <div className="flex items-center justify-around mb-10 mt-6">
          <StatusCards
            title={"Job posted"}
            icon={
              <MdOutlineScreenSearchDesktop className="text-6xl text-[#4542ee] mt-1" />
            }
            val={"2613"}
          />
          <StatusCards
            title={"Applicants"}
            icon={
              <HiOutlineClipboardDocumentList className="text-6xl text-[#4542ee] mt-1" />
            }
            val={"2613"}
          />
          <StatusCards
            title={"Job closed"}
            icon={<LuMonitorCheck className="text-6xl text-[#4542ee] mt-1" />}
            val={"2613"}
          />
          <StatusCards
            title={"Hiring success"}
            icon={<IoStatsChart className="text-6xl text-[#4542ee] mt-1" />}
            val={"2613"}
          />
        </div>

        <div className="flex items-center justify-around mb-10 mt-6">
          <Buttons title="Jobs" link={"/admin/jobs"} />
          <Buttons title={"Companies"} link={"/companies"} />
          <Buttons title={"Projects"} link={"/admin/projects"} />
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;