<<<<<<< HEAD
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
=======
"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./page.module.css";

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
    <div className={styles.pageLayout}>
      <div className={styles.authorBox}>
        
        <span className={styles.name}>{data?.name}</span>
      </div>
      <div className={styles.container}>
        <article className={styles.paper}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.metaInfo}>
            <span className={styles.category}>{data?.category}</span>
            <span className={styles.date}>
              {data?.date ? new Date(data.date).toLocaleDateString('fr-FR') : 'Date non disponible'}
            </span>
          </div>
          <div className={styles.contentBox}>
            <p className={styles.content}>
              <span className={styles.firstLetter}>{data?.content.charAt(0)}</span>
              {data?.content.slice(1)}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Page;
>>>>>>> 4448097 (ajout name sur list Articles, Lettrine article + box name)
