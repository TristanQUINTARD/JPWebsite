import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/Button'
import { useSession, signOut } from "next-auth/react"
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const NavBar = () => {
  const { data: session } = useSession()
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
        {session && (
          <>
            <li><Link href="/admin/addProduct" className='hover:text-accent'>Publier un article</Link></li>
            <li><Link href="/sondage" className="hover:text-accent">Sondages</Link></li>
          </>
        )}
        <li><Link href="/join" className='hover:text-accent'>Adhérer</Link></li>
        <li><Link href="/bibliography" className="hover:text-accent">Bibliographie</Link></li>
        
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