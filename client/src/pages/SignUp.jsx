import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Molimo vas popunite sva polja.');
    }
    try{
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in');

      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div style={{ backgroundColor: '#CED4D7' }} className='min-h-screen mt-20'>
      
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
        <div className='flex-1'>
      <Link to="/" className= 'text-4xl font-bold'>
        <span className='px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-500 rounded-lg text-white'>Congo</span>
        NEWS
      </Link>
      <p className='text-sm mt-5 font-serif font-bold uppercase'>
        Pridruži se najboljim e-novinama na teritoriji Republike Srbije!
      </p>
      </div>
      
      <div className='flex-2'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label className='font-serif' value='Korisničko ime' />
            <TextInput type='text' placeholder='Korisničko ime' id='username' onChange={handleChange} />
          </div>
          <div>
            <Label className='font-serif' value='Email adresa' />
            <TextInput type='email' placeholder='ime@gmail.com' id='email' onChange={handleChange} />
          </div>
          <div>
            <Label className='font-serif' value='Lozinka' />
            <TextInput type='password' placeholder='Lozinka' id='password' onChange={handleChange} />
          </div>
          <Button gradientDuoTone='purpletoPink' type='submit' disabled={loading}>
            {
              loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3 font-serif'>Učitava se...</span>
                </>
              ) : 'Registruj se'
            }
          </Button>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span className='font-serif'>Već imas nalog?</span>
          <Link to='/sign-in' className='text-blue-600 font-serif'>
            Prijavi se
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
