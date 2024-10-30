import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover } from '../ui/popover'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

const AdminJobsTable = () => {
    useGetAllAdminJobs()
    const { recruiterJobs,searchJobs } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(recruiterJobs)
    const navigate = useNavigate();

    useEffect(()=>{
        const filteredJobs = recruiterJobs.length>=0 && recruiterJobs.filter((job)=>{
            if(!searchJobs) return true;
            return job?.title?.toLowerCase().includes(searchJobs.toLowerCase()) || job?.companyId?.name.toLowerCase().includes(searchJobs.toLowerCase())
        })
        setFilterJobs(filteredJobs)
    },[recruiterJobs,searchJobs])
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs.length <= 0 ? <span>You haven't registered any Jobs yet</span> : (
                            <>
                                {
                                    filterJobs.map((job) => (
                                        <tr key={job._id}>
                                            <TableCell>{job?.title}</TableCell>
                                            <TableCell>{job?.companyId?.name}</TableCell>
                                            <TableCell>{job?.salary} LPA</TableCell>
                                            <TableCell className='text-right p-2'>
                                                <Popover>
                                                    <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                                                    <PopoverContent>
                                                        <div className='bg-white'>
                                                        <div onClick={()=>navigate(`/admin/companies/${job._id}`)} className='flex gap-3 w-fit cursor-pointer'>
                                                            <Edit2 />
                                                            <span>Edit</span>
                                                        </div>
                                                        <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex gap-3 w-fit cursor-pointer'>
                                                            <Eye/>
                                                            <span>Applicants</span>
                                                        </div>
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

export default AdminJobsTable
