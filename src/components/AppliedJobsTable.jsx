import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobsTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job)
  return (
    <div className='my-5 max-w-4xl mx-auto'>
        <Table>
            <TableCaption>List of applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    allAppliedJobs.length<=0 ? <span>Please apply some jobs</span> : allAppliedJobs.map((item)=>(
                        <TableRow key={item._id}>
                            <TableCell>{item?.createdAt.split('T')[0]}</TableCell>
                            <TableCell>{item?.job?.title}</TableCell>
                            <TableCell>{item?.job?.companyId?.name}</TableCell>
                            <TableCell><Badge className={item?.status=='pending' ? 'bg-gray-400' : item?.status=='rejected' ? 'bg-red-500' : 'bg-green-500'}>{item?.status.toUpperCase()}</Badge></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobsTable
