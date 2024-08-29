import React from "react";
import Image from "next/image";

const BlogTableItem = ({ title, date, deleteBlog, id}) => {

    const BlogDate = new Date(date);

    return (
        <tr className="bg-white border-b ">
            
            <td className="px-6 py-4">
                {title?title:"No title"}
            </td>
            <td className="px-6 py-4">
                {BlogDate.toDateString()}
            </td>
            <td onClick={()=>deleteBlog(id)} className="px-6 py-4 cursor-pointer">
                x
            </td>
        </tr>
    );
};

export default BlogTableItem;