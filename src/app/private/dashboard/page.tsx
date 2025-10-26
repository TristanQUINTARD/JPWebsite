"use client";

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import NavBar from '../../Components/auth/NavBar';
import Footer from '../../Components/Footer';
import Link from 'next/link';




type Article = {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  authorEmail: string;
  firstname: string;
  lastname: string;
};

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session?.user) {
      router.push('/');
    } else {
      fetchArticles();
    }
  }, [session, status, router]);

  const fetchArticles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/blog');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Filtrer les articles pour n'inclure que ceux de l'utilisateur connecté
      const userArticles = data.blogs.filter(article => article.authorEmail === session?.user?.email);
      setArticles(userArticles);
    } catch (err) {
      console.error('Erreur complète:', err);
      setError(`Erreur lors du chargement des articles: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (status === 'loading' || isLoading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-2xl">Chargement...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">Erreur : {error}</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen py-5 px-5 md:px-12 lg:px-28">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-medium mb-10">Mon Dashboard</h1>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-black hover:shadow-[7px_7px_0px_#000000]">
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">Informations du profil</h2>
                <div className='text-2xl font-bold mb-2 text-gray-900'>{session?.user?.name || "Utilisateur"}</div>
                <p className="text-gray-700">{session?.user?.email}</p>
              </div>
            </div>
            
            <div className="bg-white border border-black hover:shadow-[7px_7px_0px_#000000]">
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">Articles publiés</h2>
                <div className='text-4xl font-bold mb-2 text-gray-900'>{articles.length}</div>
                <p className="text-gray-700">articles publiés par vous</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-black mb-8">
            <div className="border-b border-black p-6">
              <h2 className='text-xl font-bold text-gray-900'>Mes articles</h2>
            </div>
            <div className="p-6">
              {articles.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-700 mb-4">Vous n'avez pas encore publié d'articles.</p>
                  <Link 
                    href="/admin/addProduct" 
                    className="inline-block bg-black text-white px-6 py-3 border border-black hover:shadow-[4px_4px_0px_#000000] transition-shadow"
                  >
                    Publier mon premier article
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-black">
                        <th className="text-left py-4 px-4 font-bold text-gray-900">Catégorie</th>
                        <th className="text-left py-4 px-4 font-bold text-gray-900">Titre</th>
                        <th className="text-left py-4 px-4 font-bold text-gray-900">Date de publication</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((article, index) => (
                        <tr 
                          key={article._id}
                          className={index < articles.length - 1 ? 'border-b border-gray-300' : ''}
                        >
                          <td className="py-4 px-4">
                            <span className="inline-block bg-black text-white px-3 py-1 text-sm">
                              {article.category}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-medium text-gray-900">{article.title}</td>
                          <td className="py-4 px-4 text-gray-700">{formatDate(article.date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <Link 
              href="/admin/addProduct" 
              className="bg-black text-white px-6 py-3 border border-black hover:shadow-[4px_4px_0px_#000000] transition-shadow font-medium"
            >
              + Nouvel article
            </Link>
            <Link 
              href="/private/settings" 
              className="bg-white border border-black px-6 py-3 hover:shadow-[4px_4px_0px_#000000] transition-shadow font-medium text-gray-900"
            >
              Paramètres
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard;