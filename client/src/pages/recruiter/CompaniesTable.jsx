import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardFooter, CardDescription, CardContent } from '../../components/ui/card'; 
import { Avatar, AvatarImage } from '../../components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { Edit2, MoreHorizontal, MapPin, Calendar, FileText } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {filterCompany?.map((company) => (
                <Card key={company._id} className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105">
                    <CardHeader className="flex items-center p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        <Avatar className="w-16 h-16">
                            <AvatarImage src={company.logo} alt={`${company.name} Logo`} className="rounded-full" />
                        </Avatar>
                        <div className="ml-4 text-white">
                            <h2 className="text-xl font-bold">{company.name}</h2>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2">
                        <div className="flex items-center gap-2 text-black">
                            <FileText />
                            <p className="font-medium">{company.description}</p>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <Calendar />
                            <p className="font-medium">{new Date(company.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <MapPin/>
                            <p className="font-medium">{company.location}</p>
                        </div>
                    </CardContent>
                    <CardFooter className="p-4 flex justify-end">
                        <Popover>
                            <PopoverTrigger>
                                <MoreHorizontal className="text-gray-500 cursor-pointer hover:text-gray-700" />
                            </PopoverTrigger>
                            <PopoverContent className="w-32">
                                <div
                                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                                    className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100"
                                >
                                    <Edit2 className="w-4 text-indigo-500" />
                                    <span className="text-gray-700">Edit</span>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default CompaniesTable;
