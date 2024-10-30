import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '@/redux/applicationSlice'
import { toast } from 'sonner'
import axios from 'axios'
import store from '@/redux/store'

const JobApplicants = () => {
  const params = useParams()
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetchApplicants = async()=>{
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/applicants/${params.id}`,{withCredentials:true})
        if(res.data.success){
          dispatch(setApplicants(res.data.job))
        }
      } catch (error) {
        console.log(error);        
      }
    }
    fetchApplicants();
  },[])
  const {applicants} = useSelector(store=>store.application)
  return (
    <div>
      <Navbar/>
      <div className='p-4'>
        <h1 className='text-2xl font-bold'>Applicants({applicants.application.length})</h1>
        <ApplicantsTable/>
      </div>
    </div>
  )
}

export default JobApplicants
