
import { assets, blog_data } from "../../../src/app/Assets/assets";
import Image from "next/image";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { set } from "mongoose";


const Header = () => {

    const [email, setEmail] = useState("");
     
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        formData.append("email", email);
        const response = await axios.post("/api/email", formData);
        if (response.data.success) {
            toast.success(response.data.msg);
            setEmail("");
        } else {
            toast.error("Erreur lors de l'envoi de l'email");
            console.log(response.data.msg);
        }
    }

    return (
        <div className="py-5 px-5 md:px12 lg:px-28">
            
            <div className="text-center my-8">
                <h1 className="text-3xl sm:text-5xl font font-medium">Revue de Juvenis Prudentia</h1>
                <p className="mt-10 max-w-[740px] m-auto text-sm sm:text-base">Juvenis Prudentia est une association et un espace étudiant qui a pour objectif de promouvoir la réflexion et la compréhension des dynamiques politiques, sociales et internationales contemporaines.</p>
                <form onSubmit={onSubmitHandler} className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000] ">
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter your email" className="pl-4 outline-none" />
                    <button type="submit" className="border-l border-black py-4 px-4 sm:px-8 active:bg-grey-600 active:text-white">Subscribe</button>

                </form>

            </div>
        </div>
    );
    }

export default Header;