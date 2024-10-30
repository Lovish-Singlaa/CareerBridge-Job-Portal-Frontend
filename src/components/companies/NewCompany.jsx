import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import axios from 'axios'

const NewCompany = () => {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState()
  const dispatch = useDispatch()

  const newCompanyHandler = async ()=>{
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
        headers:{
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if(res.data.success){
        dispatch(setSingleCompany(res.data.company));
        const companyId = res?.data?.company?._id;
        toast.success(res.data.message)
        navigate(`/admin/companies/${companyId}`)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }
  return (
    <div>
      <Navbar/>
      <div className='max-w-4xl mx-auto my-10'>
        <h1 className='text-3xl font-bold my-3 text-center'>Your Company Name</h1>
        <Label>Company Name</Label>
        <Input type='text' placeholder='Company name' onChange={(e)=>setCompanyName(e.target.value)} className='max-w-3xl my-2'/>
        <Button variant='outline' className='mr-4 mt-4' onClick={()=>navigate('/admin')}>Cancel</Button>
        <Button onClick={newCompanyHandler}>Continue</Button>
      </div>
    </div>
  )
}

export default NewCompany
