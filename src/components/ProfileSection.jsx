import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import React, { useRef, useState } from 'react'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from '@radix-ui/react-label'
import AppliedJobsTable from './AppliedJobsTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const ProfileSection = () => {
    useGetAppliedJobs()
    const isResume = true;
    const [openDialog, setOpenDialog] = useState(false);

    const {user} = useSelector(store=>store.auth)
    return (
        <>
            <Navbar />
            <div className='border max-w-6xl mx-auto mt-5 p-5'>
                <div className='flex justify-between'>
                    <div className='flex gap-4 items-center'>
                        <Avatar className='w-24 h-24'>
                            <AvatarImage className='w-20 h-20' src='https://logodix.com/logo/39950.png' />
                        </Avatar>
                        <div>
                            <h1 className='font-semibold text-xl'>{user?.fullname}</h1>
                            <span className='text-xs'>{user?.profile?.bio}</span>
                        </div>
                    </div>

                    <Button onClick={() => setOpenDialog(true)} variant='outline'><Pen /></Button>

                </div>
                <div className='my-5'>
                    <div className='flex gap-2 items-center'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div>
                    <h1>Skills</h1>
                    {
                        user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => (<Badge className='mx-1' key={index}>{item}</Badge>)) : <span>NA</span>
                    }
                </div>
                <div className='my-4'>
                    <Label className='font-bold text-md'>Resume</Label>
                    <div>
                        {
                            isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 hover:underline'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                        }
                    </div>
                    <div>
                        <h1 className='my-4 font-bold text-lg'>All Applied Jobs</h1>
                        <AppliedJobsTable />
                    </div>
                </div>
                {
                    openDialog ? <UpdateProfileDialog openDialog={openDialog} setOpenDialog={setOpenDialog} /> : null
                }
            </div>
        </>
    )
}

export default ProfileSection
