import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover } from '../ui/popover'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import GetAllCompanies from '@/hooks/GetAllCompanies'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies,searchCompanies } = useSelector(store => store.company)
    const [filterCompany, setFilterCompany] = useState(companies)
    const navigate = useNavigate();

    useEffect(()=>{
        // setFilterCompany(searchCompanies);
        const filteredCompanies = companies.length>=0 && companies.filter((company)=>{
            if(!searchCompanies) return true;
            return company?.name?.toLowerCase().includes(searchCompanies.toLowerCase())
        })
        setFilterCompany(filteredCompanies)
    },[companies,searchCompanies])
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany.length <= 0 ? <span>You haven't registered any companies yet</span> : (
                            <>
                                {
                                    filterCompany.map((company) => (
                                        <tr key={company._id}>
                                            <TableCell>
                                                <Avatar className='w-24 h-24'>
                                                    <AvatarImage className='w-10 h-10' src={company.logo} />
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>{company.name}</TableCell>
                                            <TableCell>{company.createdAt.split('T')[0]}</TableCell>
                                            <TableCell className='text-right'>
                                                <Popover>
                                                    <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                                                    <PopoverContent>
                                                        <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className='flex gap-3 w-fit cursor-pointer'>
                                                            <Edit2 />
                                                            <span>Edit</span>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </TableCell>
                                        </tr>

                                    ))
                                }
                            </>
                        )
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable
