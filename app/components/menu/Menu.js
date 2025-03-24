"use client";
import React from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import Link from 'next/link';

const Menu = () => {

  const { logged, user, handleLogout } = useAuth();

  return (
    <aside className='h-full w-44 flex flex-col justify-center items-center fixed bg-gray-900'>
        <ul className='flex flex-col justify-evenly items-center h-full text-white'>
            <Link href={"/"}><li>Inicio</li></Link>
            { logged ? <Link href={`/pages/users/id`}><li>Profile</li></Link> : "" }
            { logged ? "" : <Link href={"/pages/auth/login"}><li>login</li></Link> }
            { logged ? "" : <Link href={"/pages/auth/register"}><li>Register</li></Link> }
            { logged ? <li onClick={handleLogout} className='cursor-pointer'>Logout</li> : "" }
        </ul>
    </aside>
  )
}

export default Menu;