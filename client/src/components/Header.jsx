import React from 'react'
import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Header() {
  const path = useLocation().pathName;
  return (
    <Navbar className='border-b-2'> 
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold'>
        <span className='px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-500 rounded-lg text-white'>Congo</span>
        NEWS
      </Link>
      <form>
        <TextInput
            type='text'
            placeholder='Pretraži'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline' //na manjem prozoru nestaje
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='pink'>
        <AiOutlineSearch />
      </Button>
      <div className='md:order-2'>
        <Link to='/sign-in'>
          <Button color='gray'>
            Sign In
          </Button>
          <Navbar.Toggle /> 
        </Link>
      </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/naslovna"} as={'div'}>
            <Link to='/naslovna'>
              O nama
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/"} as={'div'}>
            <Link to='/home'>
              Početna
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={'div'}>
            <Link to='/projects'>
              Vesti
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}
