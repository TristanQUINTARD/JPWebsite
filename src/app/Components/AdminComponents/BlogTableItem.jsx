
import React from "react";

const BlogTableItem = ({ id, title, category, authorEmail, name, firstname, lastname, date, deleteBlog }) => {
    return (
        <tr className='bg-white border-b'>
            <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{title}</td>
            <td className='px-6 py-4'>{category}</td>
            <td className='px-6 py-4'>{authorEmail}</td>
            <td className='px-6 py-4'>{name}</td>
            <td className='px-6 py-4'>{date}</td>
            <td className='px-6 py-4'>
                <button onClick={() => deleteBlog(id)} className='font-medium text-blue-600 hover:underline'>Supprimer</button>
            </td>
        </tr>
    );
};

export default BlogTableItem;