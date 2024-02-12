import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center   text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Želite da budete u toku?
            </h2>
            <p className='text-gray-500 my-2'>
                Pogledajte naše priče! Uvek aktuelne!
            </p>
            <Button className='rounded-tl-xl rounded-bl-none'>
                <a href="http://localhost:5173/home" target='_blank' rel='noopener noreferrer'>
                    CongoNEWS
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/The_Indianapolis_Star%2C_2011.jpg/800px-The_Indianapolis_Star%2C_2011.jpg" />
        </div>
    </div>
  )
}