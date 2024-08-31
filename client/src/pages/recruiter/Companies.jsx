import React, { useEffect, useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../../redux/companySlice';
import Layout from '../../components/Layout';
import { Search, PlusCircle } from 'lucide-react';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <Layout>
            <div className="h-[90vh]">
                <div className=" mx-auto pt-10 px-4 sm:px-6 lg:px-8">
                    {/* Search and New Company Button Section */}
                    <div className="flex items-center justify-between mb-6 bg-white rounded-lg px-6 py-6">
                        <div className="relative w-full max-w-md">
                            <Input
                                className="pr-12 ml-5 py-2 pl-4 bg-purple-100 border border-purple-300 rounded-full shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300"
                                placeholder="Filter by name"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center px-3">
                                <Search className="text-pink-500 font-bold" />
                            </div>
                        </div>
                        <Button
                            onClick={() => navigate("/admin/companies/create")}
                            className="bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2 rounded-full shadow-md transition duration-300"
                        >
                            <PlusCircle className="w-5 h-5" />
                            New Company
                        </Button>
                    </div>
                    
                    {/* Companies Table */}
                    <div className="pt-5 ml-14 text-center max-w-6xl">
                    <CompaniesTable />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Companies;
