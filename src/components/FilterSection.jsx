import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi", "Mumbai", "Bengaluru", "Pune", "Hyedrabad"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Fullstack Developer", "Graphic Designer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42k-1lakh", "1lakh+"]
    }
]

const FilterSection = () => {
    const [selectedFilter, setSelectedFilter] = useState()
    const dispatch = useDispatch()
    const changeHandler = (value)=>{
        setSelectedFilter(value);
    }

    useEffect(()=>{
        dispatch(setSearchedQuery(selectedFilter))
    },[selectedFilter])
  return (
    <div className='p-3'>
      <div className='text-xl font-bold'>Filter Jobs</div>
      <hr className='mt-3'/>
      {
        filterData.map((data, index)=>(
            <div>
            <div className='text-lg font-bold'>{data.filterType}</div>
            <RadioGroup value={selectedFilter} onValueChange={changeHandler} className='gap-2 my-2'>
            {
                data.array.map((item,idx)=>{
                    const itemId = `id${index}-${idx}`
                    return(
                        <div key={item}>
                            
                            <RadioGroupItem value={item} id={itemId}/>
                            <Label htmlfor={itemId}>{item}</Label>
                        </div>
                    )
                })
            }
            </RadioGroup>
            </div>
        ))
    }
    </div>
  )
}

export default FilterSection
