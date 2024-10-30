import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const calculateDays = (mongoTime)=>{
    const createdAt = new Date(mongoTime);
    const currDate = new Date();
    const difference = currDate - createdAt;
    return Math.floor(difference/(24*60*60*1000))
}

const JobsList = ({job}) => {
    const navigate = useNavigate();
    return (
        <div className='py-3 px-5 border rounded-md shadow-md'>
            <div className='flex justify-between items-center'>
                <div className='text-sm'>{job?.companyId.createdAt==0 ? "Today" : `${calculateDays(job?.companyId.createdAt)} days ago`}</div>
                <Button variant='outline' size='icon' className='border-none'><Bookmark /></Button>
            </div>
            <div>
                <div className='my-4 flex gap-3 items-center'>
                    <Button variant='outline' size='icon'>
                        <Avatar>
                            <AvatarImage src={job?.companyId?.logo} />
                        </Avatar>
                    </Button>
                    <div>
                        <div className='text-lg'>{job?.companyId?.name}</div>
                        <div className='text-sm'>{job?.location}</div>
                    </div>
                </div>
                <h1 className='font-bold text-lg my-1'>{job?.title}</h1>
                <span className='text-sm text-gray-500'>{job?.description}</span>
            </div>
            
                <div className='my-3 flex items-center gap-2'>
                    <Badge className='border rounded-full text-orange-500 font-bold' variant='ghost'>{job?.position}</Badge>
                    <Badge className='border rounded-full text-lime-700 font-bold' variant='ghost'>{job?.salary} LPA</Badge>
                    <Badge className='border rounded-full text-indigo-600 font-bold' variant='ghost'>{job?.jobType}</Badge>
                </div>
            
            <div className='flex gap-4 my-2'>
                <Button onClick={()=>navigate(`/details/${job?._id}`)} variant='outline'>Details</Button>
                <Button className='bg-[#f53d5b] hover:bg-[#ff4f6c]'>Save For Later</Button>
            </div>

        </div>
    )
}

export default JobsList
