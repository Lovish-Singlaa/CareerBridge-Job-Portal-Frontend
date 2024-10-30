import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeaderSection from './HeaderSection'
import CategorySection from './CategorySection'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import GetAllJobsHook from '@/hooks/GetAllJobsHook'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

const Home = () => {
  GetAllJobsHook();
  const {user} = useSelector(store=>store.auth)
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role=='recruiter'){
      navigate('/admin')
    }
  },[])
  
  return (
    <div className='sm:w-full'>
      <div className='bg-cover bg-center text-white w-full h-screen' style={{ backgroundImage: `url('https://themesdesign.in/joobsy/images/bg-home.jpg')` }}>

      <Navbar/>
      <HeaderSection/>
      <CategorySection/>
      </div>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home
