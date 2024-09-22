<<<<<<< HEAD
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../Components/ui/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../Components/ui/Table';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

type Article = {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  authorEmail: string;
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

  if (status === 'loading' || isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className='flex min-h-screen'>
      <div className="flex-1 bg-gray-100 dark:bg-gray-950">
        <div className="p-6 grid gap-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Profil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{session?.user?.name || "Utilisateur"}</div>
                <p>{session?.user?.email}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-2xl font-bold">Articles Publiés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-4xl font-bold'>{articles.length}</div>
                <p>articles publiés par vous</p>
              </CardContent>
            </Card>
          </div>

          <div className='grid gap-6 text-white'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Les articles publiés par l'utilisateur</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='text-white'>Catégorie</TableHead>
                      <TableHead className='text-white'>Titre</TableHead>
                      <TableHead className='text-white'>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.map((article) => (
                      <TableRow key={article._id}>
                        <TableCell>{article.category}</TableCell>
                        <TableCell>{article.title}</TableCell>
                        <TableCell>{formatDate(article.date)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

=======
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../Components/ui/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../Components/ui/Table';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

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

  if (status === 'loading' || isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className='flex min-h-screen'>
      <div className="flex-1 bg-gray-100 dark:bg-gray-950">
        <div className="p-6 grid gap-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Profil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{session?.user?.name || "Utilisateur"}</div>
                <p>{session?.user?.email}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-2xl font-bold">Articles Publiés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-4xl font-bold'>{articles.length}</div>
                <p>articles publiés par vous</p>
              </CardContent>
            </Card>
          </div>

          <div className='grid gap-6 text-white'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Les articles publiés par l'utilisateur</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='text-white'>Catégorie</TableHead>
                      <TableHead className='text-white'>Titre</TableHead>
                      <TableHead className='text-white'>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.map((article) => (
                      <TableRow key={article._id}>
                        <TableCell>{article.category}</TableCell>
                        <TableCell>{article.title}</TableCell>
                        <TableCell>{formatDate(article.date)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

>>>>>>> 4448097 (ajout name sur list Articles, Lettrine article + box name)
export default Dashboard;