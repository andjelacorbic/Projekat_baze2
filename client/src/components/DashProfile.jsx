import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import { updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashProfile() {
  const {currentUser, error, loading} = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
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
    <div className='max-w-lg  p-3 w-full'>
      <h1 className='my-7 text-left font-semibold text-3xl font-serif font-bold '>MOJ PROFIL</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
        <div className='w-32 h-32' onClick={() => filePickerRef.current.click ()}>
        <img src={imageFileUrl || currentUser.profilePicture} alt='korisnik' className='rounded-full w-full h-full object-cover border-10 border-[black]' />
        </div>
        <TextInput type='text' id='username' placeholder='korisničko ime' defaultValue={currentUser.username} onChange={handleChange}/>
        <TextInput type='email' id='email' placeholder='email adresa' defaultValue={currentUser.email} onChange={handleChange}/>
        <TextInput type='password' id='password' placeholder='**********' onChange={handleChange}/>
        <Button className='font-serif font-bold' type='submit'color='gray' outline disabled={loading}>
        {loading ? 'Učitava se...' : 'IZMENI PROFIL'}
          
        </Button>
        {currentUser.isAdmin && (
          <Link to={'/create-post'}>
            <Button
              type='button'
              gradientDuoTone='gray'
              className='w-full font-serif font-bold'
            >
              DODAJ OBJAVU
            </Button>
          </Link>
        )}
      </form>
      <div className='text-blue-500 flex justify-between mt-5'>
        <span onClick={()=>setShowModal(true)} className='cursor-pointer font-serif'>Obriši nalog</span>
        <span onClick={handleSignout} className='cursor-pointer font-serif'>Odjavi me</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
       {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}
       <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            
            <h3 className='mb-5 text-lg font-serif'>
              Da li ste sigurni da želite da obrišete nalog?
            </h3>
            <div className='flex justify-center gap-4 font-serif'>
              <Button color='gray' onClick={handleDeleteUser}>
                DA
              </Button>
              <Button className='font-serif' color='gray' onClick={() => setShowModal(false)}>
                NE
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}