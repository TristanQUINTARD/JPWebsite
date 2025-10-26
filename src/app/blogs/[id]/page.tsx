"use client"
import { useEffect, useState, use } from 'react';
import axios from 'axios';
import styles from "./page.module.css";
import NavBar from "../../Components/auth/NavBar";

const Page = ({ params }) => {
  const resolvedParams = use(params);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get('/api/blog', {
          params: { id: resolvedParams.id }
        });
        setData(response.data.blog);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, [resolvedParams.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading blog data.</p>;

  return (
    <>
    <NavBar />
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
    </>
  );
};

export default Page;
