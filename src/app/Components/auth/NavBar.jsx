import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/Button'


const NavBar = () => {
  return <nav className='relative z-10 flex max-w-max rounded-base font-bold border-border dark:border-darkBorder border-2 p-1 bg-main flex-1 items-center justify-center'>

    <Link href="/" className='text-xl font-bold'>Juvenis Prudentia</Link>
    <ul>
      <li>
        <Link href="/login" className='hover:text-gray-400'>Connexion</Link>
      </li>
      <li>
        <Link href="/register" className='hover:text-gray-400'>S'inscrire</Link>
      </li>
      <li>
        <Link href="/dashboard" className='hover:text-gray-400'>Paramètres</Link>
      </li>

      <form>
        <Button type='submit' variant={"reverse"}>Déconnexion</Button>
      </form>
    </ul>
  </nav>
}

export default NavBar