import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { Input } from '../ui/input'
import { Label } from '@radix-ui/react-label'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import axios from 'axios'
import GetCompanyById from '@/hooks/GetCompanyById'

const UpdateCompanyInfo = () => {
    const params = useParams()
    
    GetCompanyById(params.id)
        
    const { singleCompany } = useSelector(store => store.company)
    const navigate = useNavigate()
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })
    const [loading, setLoading] = useState(false)
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const fileHandler = (e) => {
        const file = e.target?.files?.[0];
        setInput({ ...input, file })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log(input);
        const formdata = new FormData();
        formdata.append("name", input.name)
        formdata.append("description", input.description)
        formdata.append("website", input.website)
        formdata.append("location", input.location)
        if (input.file) {
            formdata.append("file", input.file)
        }
        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/admin')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name||"",
            description: singleCompany.description||"",
            website: singleCompany.website||"",
            location: singleCompany.location||"",
            file: singleCompany.file||"",
        })
    }, [])
    return (
        <div>
            <Navbar />
            <Button variant='outline' className='mx-5 border-none' onClick={() => navigate('/admin/company/new')}>
                <ArrowLeft />
                <span>Back</span>
            </Button>
            <div className='max-w-4xl mx-auto'>
                <form onSubmit={submitHandler}>
                    <h1 className='text-center font-bold text-2xl mb-5'>Company Setup</h1>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 w-[90%] mx-auto'>
                        <div>
                            <Label>Company Name</Label>
                            <Input type='text' name='name' value={input.name} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type='text' name='description' value={input.description} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input type='text' name='website' value={input.website} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type='text' name='location' value={input.location} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>file</Label>
                            <Input type='file' accept='/image' onChange={fileHandler} />
                        </div>
                    </div>
                    {/* <Button type='submit'>Submit</Button> */}
                    {
                        loading ? <Button className='w-full'><Loader2 className='mx-2 w-4 h-4 animate-spin' />Please wait</Button> : <Button type='submit' className='w-[95%] m-3'>Submit</Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default UpdateCompanyInfo
