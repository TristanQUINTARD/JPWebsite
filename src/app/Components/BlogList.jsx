<<<<<<< HEAD

import React, { useState, Component, Fragment, useEffect } from "react";
import { NextResponse } from "next/server";
import { set, index } from "mongoose";
import { blog_data } from "../../../src/app/Assets/assets";
import axios from "axios";
import mongoose from "mongoose";
import Blogitem from "./Blogitem";







export const BlogList = () => {
    const [menu, setMenu] = React.useState("All");
    const [blogs, setBlogs] = React.useState([]);

    const fetchBlogs = async () => {
        try {
            const response = await axios("/api/blog");
            console.log(response.data); // Affiche l'ensemble de la réponse
            setBlogs(response.data.blogs); // Assurez-vous que 'blogs' est bien défini dans la réponse
        } catch (error) {
            console.error("Failed to fetch blogs", error);
            }
        }


    useEffect(() => {
        fetchBlogs();
    }, [])

    return (
        <div>
            <div className="flex justify-center gap-6 my-10">
                <button onClick={() => setMenu("All")} className={menu ==="All"?"bg-black text-white py-1 px-4 rounded-sm":""}>All</button>
                <button onClick={() => setMenu("Technology")} className={menu==="Technology"?"bg-black text-white py-1 px-4 rounded-sm":""}>Technology</button>
                <button onClick={() => setMenu("Science")} className={menu==="Science"?"bg-black text-white py-1 px-4 rounded-sm":""}>Science</button>
                <button onClick={() => setMenu("Business")} className={menu==="Business"?"bg-black text-white py-1 px-4 rounded-sm":""}>Business</button>
                <button onClick={() => setMenu("Health")} className={menu==="Health"?"bg-black text-white py-1 px-4 rounded-sm":""}>Health</button>
                <button onClick={() => setMenu("Startup")} className={menu==="Startup"?"bg-black text-white py-1 px-4 rounded-sm":""}>Startup</button>
            </div>
            <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
                {blogs.filter((item)=> menu==="All"?true:item.category=== menu).map((item, index)=>{
                return <Blogitem key={index} id={item._id} image={item.image} title={item.title} description={item.description} category={item.category} />
                })}
            </div>
        </div>
    )
}

=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import Blogitem from "./Blogitem";

export const BlogList = () => {
    const [menu, setMenu] = useState("All");
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const response = await axios("/api/blog");
            console.log(response.data); // Affiche l'ensemble de la réponse
            setBlogs(response.data.blogs); // Assurez-vous que 'blogs' est bien défini dans la réponse
        } catch (error) {
            console.error("Failed to fetch blogs", error);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

    return (
        <div>
            <div className="flex justify-center gap-6 my-10">
                <button onClick={() => setMenu("All")} className={menu ==="All"?"bg-black text-white py-1 px-4 rounded-sm":""}>All</button>
                <button onClick={() => setMenu("Technology")} className={menu==="Technology"?"bg-black text-white py-1 px-4 rounded-sm":""}>Technology</button>
                <button onClick={() => setMenu("Science")} className={menu==="Science"?"bg-black text-white py-1 px-4 rounded-sm":""}>Science</button>
                <button onClick={() => setMenu("Business")} className={menu==="Business"?"bg-black text-white py-1 px-4 rounded-sm":""}>Business</button>
                <button onClick={() => setMenu("Health")} className={menu==="Health"?"bg-black text-white py-1 px-4 rounded-sm":""}>Health</button>
                <button onClick={() => setMenu("Startup")} className={menu==="Startup"?"bg-black text-white py-1 px-4 rounded-sm":""}>Startup</button>
            </div>
            <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
                {blogs.filter((item)=> menu==="All" ? true : item.category === menu).map((item, index) => {
                    return (
                        <Blogitem 
                            key={index} 
                            id={item._id} 
                            image={item.image} 
                            title={item.title} 
                            description={item.description} 
                            category={item.category} 
                            date={item.date} 
                            authorEmail={item.authorEmail} 
                            name={item.name}
                            tags={item.tags} 
                        />
                    )
                })}
            </div>
        </div>
    )
}

>>>>>>> 4448097 (ajout name sur list Articles, Lettrine article + box name)
export default BlogList;