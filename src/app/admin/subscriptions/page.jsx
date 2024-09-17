"use client"
import React, { useEffect } from 'react';
import axios from 'axios';
import EmailTableItem from '../../Components/AdminComponents/EmailTableItem';
import { toast } from 'react-toastify';

const page = () => {

    const [emails, setEmail] = React.useState([]);

    const fetchEmails = async () => {
        const response = await axios.get('/api/email');
        setEmail(response.data.emails);
    }
    
const deleteEmail = async (mongoId) => {
    try {
        const response = await axios.delete(`/api/email`, {
            params: { id: mongoId }
        });
        toast.success(response.data.msg);
        fetchEmails();

    } catch (error) {
        console.error("Erreur dans la supression de l'email", error);
    }
}

    useEffect(() => {
        fetchEmails();
    }, []);


    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1>Toute les adhésions</h1>
            <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
                 <table className='w-full text-sm text-gray-500'>
                    <thead className='text-xs text bg-gray-700 text-left uppercase bg-gray-50'>
                        <tr>
                            <th scope="col" className='hidden sm:block px6 py-3'>Nom</th>
                            <th scope="col" className='hidden sm:block px6 py-3'>Email</th>
                            <th scope="col" className='hidden sm:block px6 py-3'>Date</th>
                            <th scope="col" className='hidden sm:block px6 py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emails.map((item, index) => {
                            return <EmailTableItem key={index} mongoId={item._id} deleteEmail={deleteEmail} email={item.email} date={item.date}/>
                        })}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default page;