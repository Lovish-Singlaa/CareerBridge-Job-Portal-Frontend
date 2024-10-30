import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })
    const{loading} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname)
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if (res.data.success) {
                navigate("/login")
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        } finally{
            dispatch(setLoading(false));
        }
    }
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border rounded-md m-4 '>
                    <h1 className='text-2xl font-bold m-4'>Signup</h1>
                    <div className='m-3'>
                        <Label>Full Name</Label>
                        <Input type='text' placeholder='fullname' value={input.fullname} name="fullname" onChange={changeEventHandler} />
                    </div>
                    <div className='m-3'>
                        <Label>Email</Label>
                        <Input type='text' placeholder='email' value={input.email} name="email" onChange={changeEventHandler} />
                    </div>
                    <div className='m-3'>
                        <Label>Phone No.</Label>
                        <Input type='text' placeholder='phone' value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} />
                    </div>
                    <div className='m-3'>
                        <Label>Password</Label>
                        <Input type='password' placeholder='password' value={input.password} name="password" onChange={changeEventHandler} />
                    </div>
                    <div >
                        <RadioGroup defaultValue="comfortable" className='flex gap-4 m-4'>
                            <div className="flex items-center space-x-2">
                                <Input type='radio' name='role' value='student' className='cursor-pointer' checked={input.role === "student"} onChange={changeEventHandler} />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type='radio' name='role' value='recruiter' className='cursor-pointer' checked={input.role === "recruiter"} onChange={changeEventHandler} />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className='m-3'>
                        <Label htmlFor="r4">Profile</Label>
                        <Input accept='image/*' type='file' onChange={changeFileHandler} className='cursor-pointer' />
                    </div>
                    {
                        loading ? <Button className='w-full'><Loader2 className='mx-2 w-4 h-4 animate-spin' />Please wait</Button> : <Button type='submit' className='w-[95%] m-3'>Submit</Button>
                    }
                    
                    <span className='m-3 text-sm'>Already have an account? <Link to="/login" className='text-blue-500'>Login Now</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup
