import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import React from 'react'

const JobCard = ({job}) => {
  const navigate = useNavigate()
  return (
    <div className='border rounded-lg shadow-md p-3 pb-8 cursor-pointer' onClick={()=>navigate(`/details/${job._id}`)}>
      <div className='flex gap-4'>
      {/* <div></div> */}
      
      <h1 className='text-xl font-bold'>{job?.companyId?.name}</h1>
      </div>
      <span className='text-sm'>{job?.location}</span>
      <div>
        <h2 className='text-lg font-bold'>{job?.title}</h2>
        <span>{job?.description}</span>
      </div>
      <div className='mt-2 flex items-center gap-2'>
        <Badge className='border rounded-full text-orange-500 font-bold' variant='ghost'>{job?.position}</Badge>
        <Badge className='border rounded-full text-lime-700 font-bold' variant='ghost'>{job?.salary} LPA</Badge>
        <Badge className='border rounded-full text-indigo-600 font-bold' variant='ghost'>{job?.jobType}</Badge>
      </div>
    </div>
  )
}

export default JobCard
