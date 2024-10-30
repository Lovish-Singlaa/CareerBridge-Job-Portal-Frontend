import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setJobById } from '@/redux/jobSlice';
import { toast } from 'sonner';

const JobDetails = () => {
    // const isApplied = false;
    const params = useParams();
    const jobid = params.id;
    const {singleJob} = useSelector(store=>store.job);
    const {user} = useSelector(store=>store.auth)
    const dispatch = useDispatch();
    const isApplied = singleJob?.application?.some(application=>application?.applicant==(user?._id)) || false;
    const [nowApplied, setNowApplied] = useState(isApplied);

    const applyJobHandler = async ()=>{
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobid}`, {withCredentials:true})
        console.log(res)
        if(res.data.success){
          setNowApplied(true);
          const updateSingleJob = {...singleJob, application:[...singleJob.application, {applicant: user._id}]}
          dispatch(setJobById(updateSingleJob))
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.res.data.message);
        
      }
    }

    useEffect(()=>{
      const getJobById =async()=>{
          try {
            const res = await axios.get(`${JOB_API_END_POINT}/get/${jobid}`,{withCredentials:true});
            if(res.data.success){
              dispatch(setJobById(res.data.job))
              setNowApplied(res.data.job.application.some(application=>application.applicant==user?._id));
            }
          } catch (error) {
            console.log(error);
            
          }
      }
      getJobById()
  },[jobid,dispatch,user?._id])

  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <div className='flex justify-between items-center'>
      <h1 className='font-bold text-xl'>Title</h1>
      <Button className={`rounded-lg ${nowApplied ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#f53d5b] hover:bg-[#fe4e6c]'}`} onClick={applyJobHandler}>{nowApplied?'Already Applied' :'Apply Now'}</Button>
      </div>
      <p className='my-4'>Job Description</p>
      <hr />
      <p><span className='font-bold my-3'>Role: </span> {singleJob?.title}</p>
      <p><span className='font-bold my-3'>Location: </span> {singleJob?.location}</p>
      <p><span className='font-bold my-3'>Description: </span> {singleJob?.description}</p>
      <p><span className='font-bold my-3'>Experience: </span> {singleJob?.experienceLevel}</p>
      <p><span className='font-bold my-3'>Salary: </span> {singleJob?.salary}</p>
      <p><span className='font-bold my-3'>Total Applicants: </span> {singleJob?.application?.length}</p>
      {/* <p><span className='font-bold my-3'>Posted Date: </span>{singleJob?.companyId.createdAt}</p> */}
    </div>
  )
}

export default JobDetails
