"use client";
import React from "react";
import Image from "next/image";
import { assets } from "../../../src/app/Assets/assets";


const Footer = () => {
    return (
        <div className="flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center">
            
            <Image src={assets.logo} alt="Logo" width={120} height={120} />

            <p className="text-sm text-white">© 2024 Tous droits réservés.</p>
            <div className="flex gap-2">
                <Image src={assets.facebook} alt="Facebook" width={30} height={30} />
                <Image src={assets.twitter} alt="Twitter" width={30} height={30} />
                <Image src={assets.linkedin} alt="LinkedIn" width={30} height={30} />
                <Image src={assets.instagram} alt="Instagram" width={30} height={30} />
            </div>
        </div>
    )
}

export default Footer;