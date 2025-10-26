
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";


const Blogitem = ({ title, description, category, image, id, date, authorEmail, name, tags }) => {
    // Vérification des props
    if (!title || !description || !category || !id) {
        console.error("Un ou plusieurs props manquent.");
        return null;
    }

    // Fonction pour formater la date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime()) 
            ? date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
            : 'Date non disponible';
    }

    // Vérifier si l'image est valide
    const hasValidImage = image && image.trim() !== '';

    return (
        <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[7px_7px_0px_#000000]">
            {hasValidImage && (
                <Link href={`/blogs/${id}`} passHref>
                    <Image 
                        src={image}
                        alt={`Image pour ${title}`} 
                        width={400} 
                        height={400} 
                        className="border-b border-black"
                    />
                </Link>
            )} 
            <p className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm">{category}</p>
            <div className="p-5">
                <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">{title}</h5>
                <p className="mb-3 text-sm tracking-tight text-gray-700"
                dangerouslySetInnerHTML={{ __html: description.slice(0,120) }}></p>
                <p className="text-xs text-gray-500 mb-2">
                    {authorEmail && `Par ${name}`} {date && `le ${formatDate(date)}`}
                </p>
                {tags && tags.length > 0 && (
                    <div className="mb-3">
                        {tags.map((tag, index) => (
                            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <Link href={`/blogs/${id}`} legacyBehavior>
                    <a className="inline-flex items-center py-2 font-semibold text-center">
                        Lire la suite
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                </Link>
            </div>
        </div>
    );
}

export default Blogitem;
