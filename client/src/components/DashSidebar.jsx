import { Sidebar } from 'flowbite-react';

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  

  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                className='font-serif font-bold'
                as='div'
              >
                PREGLED
              </Sidebar.Item>
            </Link>
          )}
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              
              className='font-serif font-bold'
              labelColor='dark'
              as='div'
            >
              MOJ PROFIL
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                className='font-serif font-bold'
                as='div'
              >
                OBJAVE
              </Sidebar.Item>
            </Link>
          )}
          
          
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}