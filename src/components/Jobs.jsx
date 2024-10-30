import React, { useEffect, useState } from 'react'
import FilterSection from './FilterSection'
import Navbar from './shared/Navbar';
import JobsList from './JobsList';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useLocation } from 'react-router-dom';
import GetAllJobsHook from '@/hooks/GetAllJobsHook';
import { Button } from './ui/button';


const Jobs = () => {
  const {allJobs, searchedQuery} = useSelector(store=>store.job)
  const [filteredJobs,setFilteredJobs] = useState(allJobs)
  const dispatch = useDispatch()
  const location = useLocation()

  GetAllJobsHook(searchedQuery)

  useEffect(()=>{
    if(searchedQuery){
      const filterJobs = allJobs.filter((job)=>{
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) || job.description.toLowerCase().includes(searchedQuery.toLowerCase()) || job.location.toLowerCase().includes(searchedQuery.toLowerCase());
      })
      setFilteredJobs(filterJobs)
    } else{
      setFilteredJobs(allJobs)
    }

  },[searchedQuery,allJobs])

  useEffect(() => {
    return () => {
      if (location.pathname !== '/jobs') {
        dispatch(setSearchedQuery(''));
      }
    };
  }, [location.pathname, dispatch]);

  const clearFilter = ()=>{
    dispatch(setSearchedQuery(''))
  }

  return (
    <div>
      <Navbar/>
      {/* <h1 className='text-2xl font-bold my-3'>Jobs({filteredJobs.length})</h1> */}
      <Button  className={`absolute right-0 w-16 text-[10px] mx-2 h-7 ${!searchedQuery?'hidden':null}`}>Clear Filters</Button>
      <div className='flex gap-5 m-4'>
        <div className='hidden md:grid w-[20%] m-4 border rounded-md h-[100vh]'>
          <FilterSection/>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 flex-1 flex-wrap mt-4 overflow-y-auto'>
          {
            filteredJobs.length<=0 ? <div className='text-2xl font-bold'>No Jobs Found</div>:(
            filteredJobs.map((job)=>(
                <motion.div
                initial={{opacity:0, x:100}}
                animate={{opacity:1, x:0}}
                exit={{opacity:0, x:-100}}
                 key={job?._id}>
                <JobsList job={job}/>
                </motion.div>
            ))
)}
        </div>
      </div>
    </div>
  )
}

export default Jobs
