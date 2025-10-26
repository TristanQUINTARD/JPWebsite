"use client";

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import NavBar from '../../Components/auth/NavBar';
import Footer from '../../Components/Footer';
import Link from 'next/link';

const Settings = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session?.user) {
      router.push('/');
    }
  }, [session, status, router]);

  if (status === 'loading') {
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

  return (
    <>
      <NavBar />
      <div className="min-h-screen py-5 px-5 md:px-12 lg:px-28">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-medium mb-10">Paramètres</h1>
          
          {/* Section Profil */}
          <div className="bg-white border border-black hover:shadow-[7px_7px_0px_#000000] mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Mon Profil</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-700 mb-1">Nom complet</p>
                  <p className="text-lg font-medium text-gray-900">{session?.user?.name || "Non renseigné"}</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-700 mb-1">Email</p>
                  <p className="text-lg font-medium text-gray-900">{session?.user?.email || "Non renseigné"}</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-700 mb-1">Statut</p>
                  <span className="inline-block bg-black text-white px-3 py-1 text-sm">
                    Membre actif
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 flex-wrap">
            <Link 
              href="/private/dashboard" 
              className="bg-black text-white px-6 py-3 border border-black hover:shadow-[4px_4px_0px_#000000] transition-shadow font-medium"
            >
              Retour au Dashboard
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;