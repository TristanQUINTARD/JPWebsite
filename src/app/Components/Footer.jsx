"use client";
import React, { useState, Component, Fragment } from "react";
import Image from "next/image";
import { assets } from "../../../src/app/Assets/assets";


const Footer = () => {
    return (
        <div className="flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center">
            
            <Image src={assets} alt="" width={120} />

            <p className="text-sm text-white"> 2024 Tous droits réservés.</p>
            <div className="flex gap-2">
                <Image src={assets} alt="" width={30} height={30} />
                <Image src={assets} alt="" width={30} height={30} />
                <Image src={assets} alt="" width={30} height={30} />
                <Image src={assets} alt="" width={30} height={30} />
            </div>
        </div>
    )
}

export default Footer;