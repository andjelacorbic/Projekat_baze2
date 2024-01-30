import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react'
import { Link } from 'react-router-dom';


export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
        <div className='flex-1'>
      <Link to="/" className= 'text-4xl font-bold'>
        <span className='px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-500 rounded-lg text-white'>Congo</span>
        NEWS
      </Link>
      <p className='text-sm mt-5'>
        Pridruži se najboljim e-novinama na teritoriji Republike Srbije!
      </p>
      </div>
      
      <div className='flex-2'>
        <form className='flex flex-col gap-4'>
          <div>
            <Label value='Korisničko ime' />
            <TextInput type='text' placeholder='Korisničko ime' id='username' />
          </div>
          <div>
            <Label value='Email adresa' />
            <TextInput type='text' placeholder='ime@gmail.com' id='username' />
          </div>
          <div>
            <Label value='Lozinka' />
            <TextInput type='text' placeholder='Lozinka' id='username' />
          </div>
          <Button gradientDuoTone='purpletoPink' type='submit'>
            Registruj se
          </Button>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span>Već imas nalog?</span>
          <Link to='/sign-in' className='text-blue-600'>
            Uloguj se
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}
