import React, { useState } from 'react'
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogTrigger, DialogClose } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import axios from 'axios'
import { toast } from 'sonner'

const UpdateProfileDialog = ({openDialog, setOpenDialog}) => {
    const [loading,setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const dispatch = useDispatch()
    const [input,setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill=>skill),
        resume: user?.profile?.resume,
    })

    const changeEventHandler = (e)=>{
      setInput({...input,[e.target.name]:e.target.value});
    }

    const changeFileHandler = (e)=>{
      const file = e.target.files?.[0];
      setInput({...input,file})
    }

    const submitHandler = async (e)=>{
      e.preventDefault();
      console.log(input);
      
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("bio", input.bio);
      formData.append("skills", input.skills);

      if(input.file){
        formData.append("file", input.file);
      }

      try {
        setLoading(true)
        const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
          headers:{
            'Content-Type' : 'multipart/form-data'
          },
          withCredentials: true
        })
        if(res.data.success){
          dispatch(setUser(res.data.user));
          toast(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data?.message);      
      } finally{
        setLoading(false);
        setOpenDialog(false);
      }
    }
  return (
    <div>
      <Dialog open={openDialog} >
        
        <DialogContent onInteractOutside={()=>setOpenDialog(false)}>
            <DialogHeader>
                <DialogTitle>Want to update your profile?</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitHandler}>
                <div className='grid grid-cols-4 items-center my-3 gap-2'>
                    <Label htmlFor="name" className='text-right'>Name</Label>
                    <Input id="fullname" value={input.fullname} type='text' onChange={changeEventHandler} name='fullname' className="col-span-3"/>
                </div>
                <div className='grid grid-cols-4 items-center my-3 gap-2'>
                    <Label htmlFor="email" className='text-right'>email</Label>
                    <Input id="email" name='email' value={input.email} type='email' onChange={changeEventHandler} className="col-span-3"/>
                </div>
                <div className='grid grid-cols-4 items-center my-3 gap-2'>
                    <Label htmlFor="phoneNumber" className='text-right'>number</Label>
                    <Input id="phoneNumber" name='phoneNumber' value={input.phoneNumber} type='text' onChange={changeEventHandler} className="col-span-3"/>
                </div>
                <div className='grid grid-cols-4 items-center my-3 gap-2'>
                    <Label htmlFor="bio" className='text-right'>bio</Label>
                    <Input id="bio" name='bio' value={input.bio} onChange={changeEventHandler} className="col-span-3"/>
                </div>
                <div className='grid grid-cols-4 items-center my-3 gap-2'>
                    <Label htmlFor="skills" className='text-right'>skills</Label>
                    <Input id="skills" name='skills' value={input.skills} onChange={changeEventHandler} className="col-span-3"/>
                </div>
                <div className='grid grid-cols-4 items-center my-3 gap-2'>
                    <Label htmlFor="file" className='text-right'>resume</Label>
                    <Input id="file" name='file' type='file' accept='application/pdf'onChange={changeFileHandler} className="col-span-3"/>
                </div>
            {
            loading ? <Button className='w-full'><Loader2 className='mx-2 w-4 h-4 animate-spin'/>Please wait</Button> : <Button type='submit' className='w-[95%] m-3'>Update</Button>
          }
            </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateProfileDialog
