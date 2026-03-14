import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const Rootlayout = () => {
    return (
        <div className='min-w-full h-screen bg-[#98c5dc]'>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default Rootlayout;