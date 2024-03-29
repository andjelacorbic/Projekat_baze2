import React from 'react';
import { Footer } from 'flowbite-react';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-black-100'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
            <div className='mt-5'>
            <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-2xl font-semibold'>
            <span className='px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-500 font-serif rounded-lg text-white'>Congo</span>
             <a className='font-serif font-bold'>NEWS</a>
            </Link>
            </div>
            <div className='grid grid-col-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                <div>

                <Footer.Title className='font-serif' title='O nama' />
                <Footer.LinkGroup col>
                <Footer.Link
                    className='font-serif'
                    href='http://localhost:5173/naslovna'
                    target='_blank' //otvara novu stranicu
                    rel='noopener noreferrer'
                >
                    POČETNA STRANA
                </Footer.Link>
                </Footer.LinkGroup>
                </div>
                <div>

                <Footer.Title className='font-serif' title='Zapratite nas' />
                <Footer.LinkGroup col>
                <Footer.Link
                    className='font-serif'
                    href='http://www.github.com/andjelacorbic'
                    target='_blank' 
                    rel='noopener noreferrer'
                >
                    Github
                </Footer.Link>
                <Footer.Link
                    className='font-serif'
                    href='#'
                    target='_blank' 
                    rel='noopener noreferrer'
                >
                    Instagram
                </Footer.Link>
                <Footer.Link
                    className='font-serif'
                    href='#'
                    target='_blank' 
                    rel='noopener noreferrer'
                >
                    Facebook
                </Footer.Link>
                </Footer.LinkGroup>
                </div>
            </div>
            </div>
            <Footer.Divider />
            <div className='w-full sm:flex sm:items-center sm:justify-between'>
                <Footer.Copyright href='#' by="CongoNEWS" year={2024} />
            </div>
            <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                <Footer.Icon href='#' icon={BsFacebook} />
                <Footer.Icon href='#' icon={BsInstagram} />
                <Footer.Icon href='#' icon={BsTwitter} />
                <Footer.Icon href='http://www.github.com/andjelacorbic' icon={BsGithub} />
            </div>
        </div>
    </Footer>
  )
}
