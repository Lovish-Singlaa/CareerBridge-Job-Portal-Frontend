import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import JobsList from './JobsList';
import { useDispatch, useSelector } from 'react-redux';
import GetAllJobsHook from '@/hooks/GetAllJobsHook';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Browse = () => {
    const dispatch = useDispatch()
    const { allJobs, searchedQuery } = useSelector(store => store.job)
    const location = useLocation()

    GetAllJobsHook(searchedQuery)

    useEffect(() => {
        // Clear searchedQuery on mount to show all jobs
        dispatch(setSearchedQuery(''));

        // Restore the previous searchedQuery on unmount
        return () => {
            if (location.pathname !== '/browse') {
                dispatch(setSearchedQuery(searchedQuery));
            }
        };
    }, [dispatch, location.pathname, searchedQuery]);

    return (
        <>
            <Navbar />
            <div className='p-5'>
                <h1 className='font-bold text-xl'>Search Results ({allJobs.length})</h1>
                <div className='grid md:grid-cols-3 gap-4 max-w-6xl mx-auto my-4'>
                    {
                        allJobs.map((job) => (
                            
                                <motion.div
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    key={job?._id}>
                                    <JobsList key={job._id} job={job} />
                                </motion.div>
                                
                            
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Browse
