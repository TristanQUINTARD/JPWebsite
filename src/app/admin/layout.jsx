"use client"
import React from 'react'
import Sidebar from '../Components/AdminComponents/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../Components/auth/NavBar';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function Layout({children}) {
    return (
        <>
            <ToastContainer theme="dark"/>
            <NavBar />
            <div className="flex">
                <Sidebar />
                <div className="flex flex-col w-full">
                    <div className="flex item-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
                        <div className="w-[40px] h-[40px] bg-gray-300 rounded-full"></div>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}

