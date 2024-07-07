'use client'

import HomePage from "@/components/Home"


export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className=' flex justify-center items-center'>
        <h1 className='text-2xl font-bold mb-4'>Prismviewer</h1>
      </div>
      <HomePage />
    </div>
  )
}