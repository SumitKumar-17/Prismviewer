import { FaqAccordion } from '@/components/FaqAccordion'
import React from 'react'

const FAQ = () => {
  return (
    <div className='w-full h-full mx-4 flex flex-col items-center justify-center space-y-4 bg-background p-6'>
      <h1 className='text-2xl font-bold mb-4'>Frequently Asked Questions</h1>
      <FaqAccordion  />
    </div>
  )
}

export default FAQ
