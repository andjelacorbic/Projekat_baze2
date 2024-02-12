import React from 'react'
import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const path = useLocation().pathName;
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  
  

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Navbar className='border-b-2'> 
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold'>
        <span className='px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-500 rounded-lg text-white font-serif'>Congo</span>
        <a  className='font-serif'>NEWS</a>
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
            type='text'
            
            placeholder='Pretraži...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline font-serif' //na manjem prozoru nestaje
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='pink'>
        <AiOutlineSearch />
      </Button>
      <div className='md:order-2'>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt='user'
                img={currentUser.profilePicture}
                rounded
              
              />
            }
          >
            <Dropdown.Header>
              
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item className='font-serif'>PROFIL</Dropdown.Item>
            </Link>
            <DropdownDivider />
            <Dropdown.Item onClick={handleSignout} className='font-serif'>ODJAVI ME</Dropdown.Item>
          </Dropdown>
        ):
        (

        <Link to='/sign-in'>
          <Button color='gray'>
          <a className='font-serif'>PRIJAVI SE</a>
          </Button>
          <Navbar.Toggle /> 
        </Link>

        )
      
      }
      </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/naslovna"} as={'div'}>
            <Link to='/naslovna'>
              <a className='font-serif'>O NAMA</a>
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/"} as={'div'}>
            <Link to='/home'>
            <a className='font-serif'>VESTI DANA</a>
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={'div'}>
            <Link to='/projects'>
            <a className='font-serif'>KONTAKT</a>
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}
