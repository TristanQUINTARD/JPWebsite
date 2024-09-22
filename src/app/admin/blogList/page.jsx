<<<<<<< HEAD
"use client"
import React, {useEffect, useState} from 'react';
import BlogTableItem from '../../Components/AdminComponents/BlogTableItem';
import axios from 'axios';
import { toast } from 'react-toastify';
import { set } from 'mongoose';
import Image from 'next/image';



const Page = () => {

    const [blogs, setBlogs] =  useState([]);

    const fetchBlogs = async () => {
        const response = await axios.get('/api/blog');
        setBlogs(response.data.blogs);
    }

    const deleteBlog = async (id) => {
        try {
            const response = await axios.delete('/api/blog', {
                params: { id: id }
            });
            console.log('Blog supprimé:', response.data);
            toast.success(response.data.msg);
            fetchBlogs();
        } catch (error) {
            console.error('Erreur lors de la suppression du blog:', error.response ? error.response.data : error.message);
        }
        
    };
        
    
    useEffect(() => {
        fetchBlogs();
    }, []);


    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1>Tous les blogs</h1>
            <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-sm text bg-gray-700 text-left uppercase bg-gray-50'>
                        <tr>
                            <th scope="col" className='px-6 py-3'>Titre</th>
                            <th scope="col" className='px-6 py-3'>Catégorie</th>
                            <th scope="col" className='px-6 py-3'>Auteur</th>
                            <th scope="col" className='px-6 py-3'>Date</th>
                            <th scope="col" className='px-6 py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((item, index) => (
                            <BlogTableItem 
                                key={index} 
                                id={item._id} 
                                title={item.title} 
                                category={item.category}
                                authorEmail={item.authorEmail}
                                content={item.content}
                                tags={item.tags}
                                date={new Date(item.date).toLocaleDateString('fr-FR')}
                                deleteBlog={deleteBlog}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

=======
"use client"
import React, {useEffect, useState} from 'react';
import BlogTableItem from '../../Components/AdminComponents/BlogTableItem';
import axios from 'axios';
import { toast } from 'react-toastify';
import { set } from 'mongoose';
import Image from 'next/image';



const Page = () => {

    const [blogs, setBlogs] =  useState([]);

    const fetchBlogs = async () => {
        const response = await axios.get('/api/blog');
        setBlogs(response.data.blogs);
    }

    const deleteBlog = async (id) => {
        try {
            const response = await axios.delete('/api/blog', {
                params: { id: id }
            });
            console.log('Blog supprimé:', response.data);
            toast.success(response.data.msg);
            fetchBlogs();
        } catch (error) {
            console.error('Erreur lors de la suppression du blog:', error.response ? error.response.data : error.message);
        }
        
    };
        
    
    useEffect(() => {
        fetchBlogs();
    }, []);


    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1>Tous les blogs</h1>
            <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-sm text bg-gray-700 text-left uppercase bg-gray-50'>
                        <tr>
                            <th scope="col" className='px-6 py-3'>Titre</th>
                            <th scope="col" className='px-6 py-3'>Catégorie</th>
                            <th scope="col" className='px-6 py-3'>Auteur</th>
                            <th scope="col" className='px-6 py-3'>Date</th>
                            <th scope="col" className='px-6 py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((item, index) => (
                            <BlogTableItem 
                                key={index} 
                                id={item._id} 
                                title={item.title} 
                                category={item.category}
                                authorEmail={item.authorEmail}
                                content={item.content}
                                tags={item.tags}
                                date={new Date(item.date).toLocaleDateString('fr-FR')}
                                deleteBlog={deleteBlog}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

>>>>>>> 4448097 (ajout name sur list Articles, Lettrine article + box name)
export default Page;