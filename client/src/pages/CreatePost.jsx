import React from 'react';
import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
   
       <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Dodaj post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Naslov'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Izaberi kategoriju</option>
            <option value='javascript'>Vesti dana</option>
            <option value='reactjs'>Vremenska prognoza</option>
            <option value='nextjs'>Horoskop</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-gray-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            color='gray'
            size='sm'
            outline
          >
           
              Dodaj sliku          
          </Button>
        </div>
       
        <ReactQuill
          theme='snow'
          placeholder='Napiši nešto...'
          className='h-72 mb-12'
          required
          
        />
        <Button type='submit' color='gray'>
          Objavi
        </Button>
        
      </form>
    </div>
   
  );
}

