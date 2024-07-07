'use client'
import { AlertDetails } from "@/components/AlertDetails"
import HomePage from "@/components/Home"
import Navbar from "@/components/Navbar"


export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* <div className=' flex justify-center items-center'>
        <h1 className='text-2xl font-bold mb-4'>PrismViewer</h1>
      </div> */}
      <Navbar/>
      <HomePage />
      <div className="justify-center items-center space-y-4 m-4">
      <AlertDetails/>
      </div>
    </div>
  )
}