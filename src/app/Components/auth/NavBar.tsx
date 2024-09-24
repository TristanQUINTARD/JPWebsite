import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '../ui/Button'
import { useSession, signOut } from "next-auth/react"
import { ChevronDown, Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const NavBar = () => {
  const { data: session } = useSession()
  const [showConceptsMenu, setShowConceptsMenu] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault()
    await signOut({ redirect: true, callbackUrl: "/" })
  }

  return (
    <nav className='relative z-10 flex flex-wrap max-w-full rounded-base font-bold border-border p-1 bg-background text-text items-center justify-between'>
      <Link href="/" className='text-xl font-bold mr-4 text-primary'>Juvenis Prudentia</Link>
      <ul className='flex flex-wrap items-center space-x-4'>
        <li><Link href="/" className='hover:text-accent'>Accueil</Link></li>
        <li><Link href="/about" className='hover:text-accent'>A propos</Link></li>
        <li><Link href="/planisphere" className='hover:text-accent'>Carte</Link></li>
        <li><Link href="/methodology" className='hover:text-accent'>Rédaction Méthodologique</Link></li>
        <li className='relative'>
          <button
            className='flex items-center hover:text-accent'
            onClick={() => setShowConceptsMenu(!showConceptsMenu)}
          >
            Articles par concept <ChevronDown className='ml-1' size={16} />
          </button>
          {showConceptsMenu && (
            <ul className='absolute left-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg'>
              <li><Link href="/concepts/social" className='block px-4 py-2 hover:bg-accent hover:text-background'>Problématiques Sociales</Link></li>
              <li><Link href="/concepts/history" className='block px-4 py-2 hover:bg-accent hover:text-background'>Histoire</Link></li>
              <li><Link href="/concepts/politics" className='block px-4 py-2 hover:bg-accent hover:text-background'>Politique Intérieure</Link></li>
              <li><Link href="/concepts/philosophy" className='block px-4 py-2 hover:bg-accent hover:text-background'>Philosophie</Link></li>
              <li><Link href="/concepts/literature" className='block px-4 py-2 hover:bg-accent hover:text-background'>Critique Littéraire</Link></li>
            </ul>
          )}
        </li>
        <li><Link href="/recent" className='hover:text-accent'>Articles récents</Link></li>
        <li><Link href="/regions" className='hover:text-accent'>Articles par régions</Link></li>
        <li><Link href="/join" className='hover:text-accent'>Adhérer</Link></li>
        <li><Link href="/shop" className='hover:text-accent'>Boutique</Link></li>
        <li><Link href="/roundtable" className='hover:text-accent'>Table Ronde</Link></li>
        
        {/* Bouton de changement de thème */}
        <li>
          <Button onClick={toggleTheme} variant="ghost" size="icon" className="text-text hover:bg-card">
            {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </li>

        {!session ? (
          <>
            <li><Link href="/login" className='hover:text-accent'>Connexion</Link></li>
            <li><Link href="/register" className='hover:text-accent'>S'inscrire</Link></li>
          </>
        ) : (
          <>
            <li><Link href="/private/dashboard" className='hover:text-accent'>Paramètres</Link></li>
            <li><Button onClick={handleSignOut} variant="outline" className="border-accent text-accent hover:bg-accent hover:text-background">Déconnexion</Button></li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default NavBar