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
                <button onClick={() => setMenu("All")} className={menu ==="All"?"bg-black text-white py-1 px-4 rounded-sm":""}>Tout</button>
                <button onClick={() => setMenu("Social Issues")} className={menu==="Social Issues"?"bg-black text-white py-1 px-4 rounded-sm":""}>Problématiques Sociales</button>
                <button onClick={() => setMenu("History")} className={menu==="History"?"bg-black text-white py-1 px-4 rounded-sm":""}>Histoire</button>
                <button onClick={() => setMenu("Domestic Politics")} className={menu==="Domestic Politics"?"bg-black text-white py-1 px-4 rounded-sm":""}>Politique Intérieure</button>
                <button onClick={() => setMenu("Philosophy")} className={menu==="Philosophy"?"bg-black text-white py-1 px-4 rounded-sm":""}>Philosophie</button>
                <button onClick={() => setMenu("Literary Criticism")} className={menu==="Literary Criticism"?"bg-black text-white py-1 px-4 rounded-sm":""}>Critique Littéraire</button>
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

export default BlogList;