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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
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

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input,{
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if(res.data.success){
        dispatch(setUser(res.data.user))
        navigate("/")
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message)
    } finally{
      dispatch(setLoading(false));
    }
  }

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border rounded-md m-4 '>
          <h1 className='text-2xl font-bold m-4'>Login</h1>
          <div className='m-3'>
            <Label>Email</Label>
            <Input type='text' placeholder='email' value={input.email} name="email" onChange={changeEventHandler}/>
          </div>
          <div className='m-3'>
            <Label>Password</Label>
            <Input type='password' placeholder='password' value={input.password} name="password" onChange={changeEventHandler}/>
          </div>
          <div >
            <RadioGroup defaultValue="comfortable" className='flex gap-4 m-4'>
              <div className="flex items-center space-x-2">
                <Input type='radio' name='role' value='student' className='cursor-pointer' checked={input.role==="student"} onChange={changeEventHandler}/>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type='radio' name='role' value='recruiter' className='cursor-pointer' checked={input.role==="recruiter"} onChange={changeEventHandler}/>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className='w-full'><Loader2 className='mx-2 w-4 h-4 animate-spin'/>Please wait</Button> : <Button type='submit' className='w-[95%] m-3'>Submit</Button>
          }
          
          <span className='m-3 text-sm'>Don't have an account? <Link to="/signup" className='text-blue-500'>Signup</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login
