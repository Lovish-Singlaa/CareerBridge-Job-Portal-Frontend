import { useState } from 'react'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import ProfileSection from './components/ProfileSection'
import JobDetails from './components/JobDetails'
import Admin from './components/companies/Admin'
import NewCompany from './components/companies/NewCompany'
import UpdateCompanyInfo from './components/companies/UpdateCompanyInfo'
import AdminJobs from './components/companies/AdminJobs'
import NewJob from './components/companies/NewJob'
import JobApplicants from './components/companies/JobApplicants'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/jobs',
    element: <Jobs/>
  },
  {
    path: '/details/:id',
    element: <JobDetails/>
  },
  {
    path: '/browse',
    element: <Browse/>
  },
  {
    path: '/profile',
    element: <ProfileSection/>
  },
  {
    path: '/admin',
    element: <Admin/>
  },
  {
    path: '/admin/company/new',
    element: <NewCompany/>
  },
  {
    path: '/admin/companies/:id',
    element: <UpdateCompanyInfo/>
  },
  {
    path: '/admin/jobs',
    element: <AdminJobs/>
  },
  {
    path: '/admin/jobs/create',
    element: <NewJob/>
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <JobApplicants/>
  },
])

function App() {

  return (
    <>
  
      <RouterProvider router={appRouter}/>

    </>
  )
}

export default App
