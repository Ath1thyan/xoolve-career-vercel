import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../../redux/jobSlice';
import { FaMapMarkerAlt, FaIndustry, FaDollarSign, FaBriefcase, FaFilter, FaTimes } from 'react-icons/fa';
import { Collapse } from 'react-collapse';

const filterData = [
    {
        filterType: 'Location',
        icon: <FaMapMarkerAlt className="text-purple-600" />,
        options: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
    },
    {
        filterType: 'Industry',
        icon: <FaIndustry className="text-purple-600" />,
        options: ['Frontend Developer', 'Backend Developer', 'FullStack Developer'],
    },
    {
        filterType: 'Job Type',
        icon: <FaBriefcase className="text-purple-600" />,
        options: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'],
    },
];

const JobsFilterCard = () => {
    const [filters, setFilters] = useState({
        Location: [],
        Industry: [],
        'Job Type': [],
        Salary: [0, 10], // Salary in LPA
    });

    const [isSectionOpen, setIsSectionOpen] = useState({
        Location: false,
        Industry: false,
        'Job Type': false,
        Salary: false,
    });

    const dispatch = useDispatch();

    const toggleOption = (filterType, option) => {
        setFilters((prev) => {
            const currentOptions = prev[filterType];
            if (currentOptions.includes(option)) {
                return {
                    ...prev,
                    [filterType]: currentOptions.filter((item) => item !== option),
                };
            } else {
                return {
                    ...prev,
                    [filterType]: [...currentOptions, option],
                };
            }
        });
    };

    const handleSalaryChange = (e, index) => {
        const value = Number(e.target.value);
        setFilters((prev) => {
            const newSalary = [...prev.Salary];
            newSalary[index] = value;
            // Ensure min is not greater than max
            if (newSalary[0] > newSalary[1]) {
                newSalary[1] = newSalary[0];
            }
            return { ...prev, Salary: newSalary };
        });
    };

    const resetFilters = () => {
        setFilters({
            Location: [],
            Industry: [],
            'Job Type': [],
            Salary: [0, 10],
        });
    };

    useEffect(() => {
        dispatch(setSearchedQuery(filters));
    }, [filters, dispatch]);

    return (
        <div className="bg-white mt-4 p-6 rounded-2xl shadow-xl border border-gray-100 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <FaFilter className="mr-2 text-purple-600" /> Filters
                </h1>
                <button
                    onClick={resetFilters}
                    className="text-sm text-purple-600 hover:underline flex items-center"
                >
                    <FaTimes className="mr-1" /> Reset
                </button>
            </div>

            {/* Filter Sections */}
            <div className="space-y-6">
                {filterData.map((data) => (
                    <div key={data.filterType} className="border-b border-gray-200 pb-4">
                        <button
                            className="w-full flex justify-between items-center text-gray-800 font-medium mb-2 focus:outline-none"
                            onClick={() =>
                                setIsSectionOpen((prev) => ({
                                    ...prev,
                                    [data.filterType]: !prev[data.filterType],
                                }))
                            }
                        >
                            <span className="flex items-center">
                                {data.icon}
                                <span className="ml-2">{data.filterType}</span>
                            </span>
                            <span>
                                {isSectionOpen[data.filterType] ? (
                                    <svg
                                        className="w-4 h-4 transform rotate-180 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-4 h-4 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                            </span>
                        </button>
                        <Collapse isOpened={isSectionOpen[data.filterType]}>
                            <div className="mt-2 space-y-2">
                                {data.options.map((option) => (
                                    <label key={option} className="flex items-center text-gray-600">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-0"
                                            checked={filters[data.filterType].includes(option)}
                                            onChange={() => toggleOption(data.filterType, option)}
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </Collapse>
                    </div>
                ))}

                {/* Salary Filter */}
                <div className="border-b border-gray-200 pb-4">
                    <button
                        className="w-full flex justify-between items-center text-gray-800 font-medium mb-2 focus:outline-none"
                        onClick={() =>
                            setIsSectionOpen((prev) => ({
                                ...prev,
                                Salary: !prev.Salary,
                            }))
                        }
                    >
                        <span className="flex items-center">
                            <FaDollarSign className="text-purple-600" />
                            <span className="ml-2">Salary (in LPA)</span>
                        </span>
                        <span>
                            {isSectionOpen.Salary ? (
                                <svg
                                    className="w-4 h-4 transform rotate-180 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 9l-7 7-7-7" />
                                </svg>
                            ) : (
                                <svg
                                    className="w-4 h-4 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 9l-7 7-7-7" />
                                </svg>
                            )}
                        </span>
                    </button>
                    <Collapse isOpened={isSectionOpen.Salary}>
                        <div className="mt-4">
                            <div className="flex justify-between text-gray-600 mb-2">
                                <span>{filters.Salary[0]} LPA</span>
                                <span>{filters.Salary[1]} LPA</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    step="1"
                                    value={filters.Salary[0]}
                                    onChange={(e) => handleSalaryChange(e, 0)}
                                    className="w-full h-2 bg-gradient-to-r from-purple-300 via-pink-300 to-pink-500 rounded-lg outline-none focus:ring-0 appearance-none"
                                    style={{
                                        WebkitAppearance: 'none',
                                        appearance: 'none',
                                        background: `linear-gradient(90deg, rgba(128,0,128,1) ${(filters.Salary[0] / 50) * 100}%, rgba(255,105,180,1) ${(filters.Salary[1] / 50) * 100}%, rgba(220,220,220,1) 0%)`,
                                    }}
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    step="1"
                                    value={filters.Salary[1]}
                                    onChange={(e) => handleSalaryChange(e, 1)}
                                    className="w-full h-2 bg-gradient-to-r from-purple-300 via-pink-400 to-pink-500 rounded-lg outline-none focus:ring-0 appearance-none"
                                    style={{
                                        WebkitAppearance: 'none',
                                        appearance: 'none',
                                        background: `linear-gradient(90deg, rgba(128,0,128,1) ${(filters.Salary[0] / 50) * 100}%, rgba(255,105,180,1) ${(filters.Salary[1] / 50) * 100}%, rgba(220,220,220,1) 0%)`,
                                    }}
                                />
                            </div>

                            <div className="flex justify-between mt-2 text-gray-700">
                                <span>Min Salary: {filters.Salary[0]} LPA</span>
                                <span>Max Salary: {filters.Salary[1]} LPA</span>
                            </div>
                            <div className="mt-2 text-sm text-gray-500">
                                Adjust the sliders to set your desired salary range in Lakhs per Annum (LPA).
                            </div>
                        </div>
                    </Collapse>
                </div>
            </div>

            {/* Apply Filters Button */}
            <button
                onClick={() => dispatch(setSearchedQuery(filters))}
                className="mt-6 w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:from-purple-700 hover:to-indigo-700 transition duration-300"
            >
                Apply Filters
            </button>
        </div>
    );
};

export default JobsFilterCard;
