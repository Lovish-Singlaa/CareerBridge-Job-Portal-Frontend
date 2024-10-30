import React from 'react'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import authSlice, { setUser } from '@/redux/authSlice'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'


const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message);
        }

    }
    return (
        <div className=''>
            <div className='flex justify-between items-center h-16 md:max-w-full sm:max-w-xl'>
                <div className='font-bold text-3xl mx-6'>Career<span className='text-red-500'>Bridge</span></div>
                <div className='font-semibold list-none flex items-center gap-6 mx-6'>
                    {
                        user && user.role == 'recruiter' ? (
                            <>
                                <Link to='/admin'><li>Companies</li></Link>
                                <Link to='/admin/jobs'><li>Jobs</li></Link>
                            </>
                        ) : (
                            <>
                                <Link to='/'><li>Home</li></Link>
                                <Link to='/jobs'><li>Jobs</li></Link>
                                <Link to='/browse'><li>Browse</li></Link>

                            </>
                        )
                    }

                    {
                        !user ? (
                            <>
                                <div className='text-white flex gap-2 font-bold'>
                                    <Link to='/login'><Button className='bg-[#ff4f6c] hover:bg-[#ed405d]'>Login</Button></Link>
                                    <Link to='/signup'><Button className='bg-[#ff4f6c] hover:bg-[#ed405d]'>Signup</Button></Link>
                                </div>
                            </>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='border p-3 m-1 bg-white text-black'>
                                    <div className='flex gap-3 items-center'>
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                        </Avatar>
                                        <div>
                                            <div>{user?.fullname}</div>
                                            <p className='text-sm font-light'>{user?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-4'>
                                        {
                                            user && user.role == 'recruiter' ? null : (
                                                <>
                                                    <div className='flex items-center text-xs'>
                                                        <User2 />
                                                        <Link to='/profile'><Button variant='link'>View Profile</Button></Link>
                                                    </div>
                                                </>
                                            )
                                        }
                                        <div className='flex items-center text-xs'>
                                            <LogOut />
                                            <Button variant='link' onClick={logoutHandler}>Logout</Button>
                                        </div>

                                    </div>

                                </PopoverContent>
                            </Popover>
                        )
                    }


                </div>
            </div>
        </div>
    )
}

export default Navbar
