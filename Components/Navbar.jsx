import React from 'react'
import Streak from './Streak'
import Coins from './Coins'

const Navbar = () => {
  return (
    <>
    <div className='bg-gray-800 text-white p-4 flex justify-between items-center'>
        <div className="logo">
            <span className='font-bold text-lg mx-4'>Smart Quiz</span>
        </div>
      <ul className='flex space-x-4 mx-4'>
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Profile</li>
        <li>
            <Streak/>
        </li>
        <li>
            <Coins/>
        </li>
        
      </ul>
    </div>
    </>
  )
}

export default Navbar
