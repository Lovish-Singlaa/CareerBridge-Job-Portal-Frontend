import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import GetAllCompanies from '@/hooks/GetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanies } from '@/redux/companySlice'

const Admin = () => {
    GetAllCompanies();
    const navigate = useNavigate()
    const [input,setInput] = useState("")
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(setSearchCompanies(input))
    },[input])
  return (
    <div>
        <Navbar/>
      <div className='m-5 max-w-5xl'>
      <div className='flex items-center justify-between m-4'>
        <Input placeholder='Filter by name' onChange={(e)=>setInput(e.target.value)} className='w-fit m-4'/>
      <Button onClick={()=>navigate('/admin/company/new')}>New Company</Button>
      </div>
      <CompaniesTable/>
      </div>
    </div>
  )
}

export default Admin
