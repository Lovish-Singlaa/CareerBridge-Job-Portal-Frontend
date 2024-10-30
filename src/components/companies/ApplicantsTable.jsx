import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover } from '../ui/popover'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'

const ApplicantsTable = () => {
  const selectStatus = ["Approved", "Rejected"];
  const { applicants } = useSelector(store => store.application)

  const statusHandler = async(status, id)=>{
    try {
      const res = await axios.post(`${APPLICATION_API_END_POINT}/update/${id}`,{status}, {withCredentials: true});
      if(res.data.success){
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <div>
      <Table className='max-w-6xl m-5'>
        <TableCaption>List of recent applications</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            applicants && applicants.application.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                {
                  item?.applicant?.profile.resume ? <a className='text-blue-500' href={item?.applicant?.profile.resume} target='blank'>{item?.applicant?.profile.resumeOriginalName}</a> : <span>NA</span>
                }
                </TableCell>
                <TableCell>{item?.applicant.createdAt?.split('T')[0]}</TableCell>
                <TableCell className='text-right'>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className='w-28 text-center bg-white border rounded-md'>
                      {
                        selectStatus.map((status, index) => (
                          <div key={index} onClick={()=>statusHandler(status,item?._id)} className='hover:bg-gray-300'>
                            <span>{status}</span>
                          </div >
                        ))
                      }
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable
