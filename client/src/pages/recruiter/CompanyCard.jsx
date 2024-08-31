import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaRegEye, FaRegBuilding, FaMapPin, FaGlobe } from 'react-icons/fa';
// import CompanyEditModal from './CompanyEditModal';

const CompanyCard = () => {
    const { companies, searchCompanyByText } = useSelector((store) => store.company);
    const [filterCompany, setFilterCompany] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const filteredCompany = companies.length > 0
            ? companies.filter((company) => {
                if (!searchCompanyByText) {
                    return true;
                }
                return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
            })
            : [];

        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    const handleViewDetails = (company) => {
        setSelectedCompany(company);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCompany(null);
    };

    return (
        <div className="grid grid-cols-1 gap-4 p-4">
            {filterCompany.map((company) => (
                <div
                    key={company._id}
                    className="flex items-center p-4 bg-white shadow-lg rounded-lg border border-gray-100 transition-transform transform hover:scale-105"
                >
                    <img
                        src={company.logo}
                        alt={`${company.name} Logo`}
                        className="h-20 w-20 object-cover rounded-full border-4 border-gray-200 mr-4"
                    />
                    <div className="flex-1">
                        <div className="text-xl font-semibold text-gray-800 mr-5 mb-2">{company.name}</div>
                        <div className="text-gray-600 text-sm flex items-center space-x-2">
                            <FaRegBuilding className="text-gray-400" />
                            <span>Created At: {company.createdAt.split("T")[0]}</span>
                        </div>
                        <div className="text-gray-600 text-sm line-clamp-2">{company.description}</div>
                        <div className="flex items-center gap-2 mt-4">
                        <FaMapPin className="text-gray-400" />
                        <span>{company.location}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <FaGlobe className="text-gray-400" />
                            <span>{company.website}</span>
    </div>
                    </div>
                    <button
                        onClick={() => handleViewDetails(company)}
                        className="flex items-center mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-600 transition-colors"
                    >
                        <FaRegEye className="mr-2" />
                        Edit
                    </button>
                </div>
            ))}
            {/* {isModalOpen && selectedCompany && (
                <CompanyEditModal company={selectedCompany} onClose={closeModal} />
            )} */}
        </div>
    );
};

export default CompanyCard;
