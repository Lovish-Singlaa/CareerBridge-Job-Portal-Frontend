import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = ["Frontend Developer", "Backend Developer", "Fullstack Developer", "Graphic Designer", "Prompt Engineer"]

const CategorySection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const searchHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse')
  }
  return (
    <div className='w-full max-w-xl mx-auto'>
      <Carousel>
        <CarouselContent>
          {
            category.map((category, index) => (
              <CarouselItem key={index} className='md:basis-1/3 basis-1/1 mx-0.5'>
                <Button onClick={()=>searchHandler(category)} key={index} className="rounded-full">{category}</Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious className='text-red-500'/>
        <CarouselNext className='text-red-500'/>
      </Carousel>
    </div>
  )
}

export default CategorySection
