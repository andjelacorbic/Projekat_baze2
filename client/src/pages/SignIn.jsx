import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';


export default function SignIp() {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Molimo vas popunite sva polja'));
    }
    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');

      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div style={{ backgroundColor: '#CED4D7' }} className='min-h-screen mt-20'>
      
      <div style={{ backgroundColor: '#CED4D7' }} className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
        <div style={{ backgroundColor: '#CED4D7' }} className='flex-1'>
      <Link to="/" className= 'text-4xl font-bold'>
        <span className='px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-500 rounded-lg text-white font-serif'>Congo</span>
        <a className='font-serif-bold'>NEWS</a> 
      </Link>
      <p className='text-sm mt-5'>
        <a className='font-serif'>Prijavi se i budi u toku!</a>
      </p>
      </div>
      
      <div style={{ backgroundColor: '#CED4D7' }} className='flex-2'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
         
          <div>
            <Label className='font-serif' value='Email adresa' />
            <TextInput type='email' placeholder='ime@gmail.com' id='email' onChange={handleChange} />
          </div>
          <div>
            <Label className='font-serif' value='Lozinka' />
            <TextInput type='password' placeholder='********' id='password' onChange={handleChange} />
          </div>
          <Button gradientDuoTone='purpletoPink' type='submit' disabled={loading}>
            {
              loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3 font-serif'>Učitava se...</span>
                </>
              ) : <a  className='font-serif font-bold'>Uloguj se</a>
            }
          </Button>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span className='font-serif'>Nemaš nalog?</span>
          <Link to='/sign-up' className='text-blue-600'>
            <a className='font-serif'>Registruj se</a>
          </Link>
        </div>
        {
          errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )
        }
        </div>
      </div>
    </div>
  )
}
