import React, { useEffect } from 'react'
import JobCard from './JobCard';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import GetAllJobsHook from '@/hooks/GetAllJobsHook';
import axios from 'axios';
import { setAllJobs, setSearchedQuery } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import { Button } from './ui/button';


const LatestJobs = () => {
    const navigate = useNavigate()
    GetAllJobsHook()
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setSearchedQuery(''))
    },[])
    
    return (
        <div className='md:mx-12 mx-4'>
            <h1 className='text-3xl my-9 font-bold '>Latest Jobs</h1>
            <div className='grid md:grid-cols-3 gap-3'>
                {allJobs.length<=0 ? <span>No Jobs Found</span> : allJobs?.slice(0,6).map((job)=><JobCard key={job._id} job={job}/>)}

            </div>

            {
                allJobs.length>3 ? (
                    <div className='text-center my-5'>
                        <Button className='rounded-full text-xl font-light p-3 h-12' onClick={()=>navigate('/jobs')} variant='outline'>Show more</Button>
                    </div>
                ) : null
            }
        </div>
    )
}

export default LatestJobs
