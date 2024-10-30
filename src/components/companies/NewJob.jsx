import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

const NewJob = () => {
    const { companies } = useSelector(store => store.company)
    const navigate = useNavigate()
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        experience: "",
        location: "",
        jobType: "",
        position: 0,
        companyId: ""
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeSelectHandler = async (value) => {
        const selectedCompany = await companies.find((company) => company?.name?.toLowerCase() == value.toLowerCase())
        setInput({ ...input, companyId: selectedCompany._id })
    }

    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs')
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-2xl mx-auto'>
                <form onSubmit={submitHandler} className='border border-gray-200 shadow-md max-w-[80%] rounded-md p-3'>
                    <div className='grid grid-cols-2'>
                        <div className='m-2'>
                            <Label>Title</Label>
                            <Input type='text' name='title' placeholder='title' onChange={changeEventHandler} value={input.title} />
                        </div>
                        <div className='m-2'>
                            <Label>Description</Label>
                            <Input type='text' name='description' placeholder='description' onChange={changeEventHandler} value={input.description} />
                        </div>
                        <div className='m-2'>
                            <Label>Requirements</Label>
                            <Input type='text' name='requirements' placeholder='requirements' onChange={changeEventHandler} value={input.requirements} />
                        </div>
                        <div className='m-2'>
                            <Label>Salary</Label>
                            <Input type='text' name='salary' placeholder='salary' onChange={changeEventHandler} value={input.salary} />
                        </div>
                        <div className='m-2'>
                            <Label>Experience</Label>
                            <Input type='text' name='experience' placeholder='experience' onChange={changeEventHandler} value={input.experience} />
                        </div>
                        <div className='m-2'>
                            <Label>Location</Label>
                            <Input type='text' name='location' placeholder='location' onChange={changeEventHandler} value={input.location} />
                        </div>
                        <div className='m-2'>
                            <Label>Job Type</Label>
                            <Input type='text' name='jobType' placeholder='jobType' onChange={changeEventHandler} value={input.jobType} />
                        </div>
                        <div className='m-2'>
                            <Label>Position</Label>
                            <Input type='number' name='position' placeholder='position' onChange={changeEventHandler} value={input.position} />
                        </div>
                        <Select onValueChange={changeSelectHandler}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a company" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        companies.map((company) => {

                                            return (
                                                <div key={company._id}>
                                                    <SelectItem value={company.name}>{company.name}</SelectItem>
                                                </div>
                                            )
                                        })
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {
                        loading ? <Button className='w-full mt-4'><Loader2 className='mx-2 w-4 h-4 animate-spin' />Please wait</Button> : <Button type='submit' className='w-full mt-4'>Post Job</Button>
                    }
                    {
                        companies.length <= 0 ? <p className='text-red-500 text-xs text-center font-semibold'>Please register company first</p> : null
                    }
                </form>
            </div>
        </div>
    )
}

export default NewJob
