import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Button, TextInput } from 'flowbite-react';
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashProfile() {
  const {currentUser} = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }

  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile] );

  const uploadImage = async () => {
    console.log('Učitavanje slike...');
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).lenght === 0) {
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Uspešno ste izmenili profil");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  return (
    <div className='max-w-lg  p-3 w-full'>
      <h1 className='my-7 text-left font-semibold text-3xl'>Moj profil</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
        <div className='w-32 h-32' onClick={() => filePickerRef.current.click ()}>
        <img src={imageFileUrl || currentUser.profilePicture} alt='korisnik' className='rounded-full w-full h-full object-cover border-10 border-[black]' />
        </div>
        <TextInput type='text' id='username' placeholder='korisničko ime' defaultValue={currentUser.username} onChange={handleChange}/>
        <TextInput type='email' id='email' placeholder='email adresa' defaultValue={currentUser.email} onChange={handleChange}/>
        <TextInput type='password' id='password' placeholder='**********' onChange={handleChange}/>
        <Button type='submit'color='gray'>
          Izmeni
        </Button>
      </form>
      <div className='text-blue-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Obriši nalog</span>
        <span className='cursor-pointer'>Odjavi me</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
    </div>
  );
}
