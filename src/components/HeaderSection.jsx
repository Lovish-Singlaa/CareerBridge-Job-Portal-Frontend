import { setSearchedQuery } from '@/redux/jobSlice';
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HeaderSection = () => {
    const [query,setQuery] = useState();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchHandler = ()=>{
        dispatch(setSearchedQuery(query));
        navigate('/browse')
    }

    return (
        <div className='' >
            <div className='flex flex-col justify-center items-center gap-4 mt-36 mx-auto'>
                <h3 className='text-gray-300 px-3 rounded-3xl text-xl font-semibold'>Discover CareerBridge Today</h3>
                <h2 className='text-3xl font-bold text-center'>Find your New Job Easiest Way <br /> <span className='text-[#ff4f6c]'>With CareerBridge</span></h2>
            </div>
            <div className='flex md:w-[50%] items-center mx-auto my-8 h-10 relative shadow-lg border border-gray-200 rounded-full'>
            <input onChange={(e)=>setQuery(e.target.value)} type="text" placeholder="Search your jobs" className=' w-full h-full py-2 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-400'/>
            <button onClick={searchHandler} className='bg-red-500 h-full absolute right-0 border px-3 rounded-e-full'><Search className='text-white'/></button>
            </div>
        </div>
    )
}

export default HeaderSection
