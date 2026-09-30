'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { signOut, useSession } from '@/lib/auth-client'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Workouts', href: '/workouts' },
  { name: 'Contact', href: '/contact' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  console.log(session)

  return (
    <header className='sticky top-0 z-50 border-b border-[#1B2A3A] bg-[#07111F]/95 backdrop-blur'>
      <nav className='mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <Link
          href='/'
          className='shrink-0 text-2xl font-bold tracking-tight text-white'
        >
          Better<span className='text-[#C2F800]'>Auth</span>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden items-center gap-8 md:flex'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className='text-sm font-medium text-gray-300 transition hover:text-[#C2F800]'
            >
              {link.name}
            </Link>
          ))}
          {session?.user && (
            <div className='flex items-center gap-8'>
              <Link
                href='/profile'
                className='text-sm font-medium text-gray-300 transition hover:text-[#C2F800]'
              >
                Profile
              </Link>
              <Link
                href='/dashboard'
                className='text-sm font-medium text-gray-300 transition hover:text-[#C2F800]'
              >
                Dashboard
              </Link>
            </div>
          )}
        </div>

        {/* Desktop Auth Buttons */}
        {session?.user ? (
          <div className='flex items-center gap-3'>
            <p className='text-sm font-medium text-white'>
              {session.user.name}
            </p>

            <button
              onClick={() => signOut()}
              className='rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10'
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className='hidden items-center gap-3 md:flex'>
            <Link
              href='/sign-in'
              className='rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5'
            >
              Sign In
            </Link>

            <Link
              href='/sign-up'
              className='rounded-lg bg-[#C2F800] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#aee000]'
            >
              Sign Up
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className='rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden'
          aria-label='Toggle menu'
        >
          {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='border-t border-gray-800 bg-[#0B0D10] md:hidden'>
          <div className='mx-auto max-w-7xl px-4 py-4 sm:px-6'>
            {/* Mobile Nav Links */}
            <div className='flex flex-col gap-1'>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className='rounded-lg px-3 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-[#C2F800]'
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Auth Buttons */}
            <div className='mt-4 flex gap-3 border-t border-gray-800 pt-4'>
              <Link
                href='/sign-in'
                onClick={() => setIsOpen(false)}
                className='flex-1 rounded-lg border border-gray-700 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-white/5'
              >
                Sign In
              </Link>

              <Link
                href='/sign-up'
                onClick={() => setIsOpen(false)}
                className='flex-1 rounded-lg bg-[#C2F800] px-4 py-2.5 text-center text-sm font-semibold text-black transition hover:bg-[#aee000]'
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
