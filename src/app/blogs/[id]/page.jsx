"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Page = ({ params }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await axios.get('/api/blog', {
                    params: { id: params.id }
                });
                setData(response.data.blog);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
    }, [params.id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading blog data.</p>;

    return (
        <div>
            <h1>{data?.title}</h1>
            <div>{data?.description}</div>
            <img src={data?.image} alt={data?.title} />
            <button>{data?.category}</button>
            {/* Afficher d'autres champs ici si nécessaire */}
        </div>
    );
};

export default Page;
