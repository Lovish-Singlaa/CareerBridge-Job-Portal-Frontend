import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import { setSearchJobs } from '@/redux/jobSlice'

const AdminJobs = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState("")
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchJobs(input))
    }, [input])
    return (
        <div>
            <Navbar />
            <div className='m-5 max-w-5xl'>
                <div className='flex items-center justify-between m-4'>
                    <Input placeholder='Filter by name' onChange={(e) => setInput(e.target.value)} className='w-fit m-4' />
                    <Button onClick={() => navigate('/admin/jobs/create')}>New Job</Button>
                </div>
                <AdminJobsTable/>
            </div>
        </div>
    )
}

export default AdminJobs
