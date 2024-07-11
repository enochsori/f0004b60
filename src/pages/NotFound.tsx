import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import { TbError404 } from 'react-icons/tb';
import { TbActivityHeartbeat } from 'react-icons/tb';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className='h-full w-full bg-bg-dark-dark rounded-md text-color-text-dark flex flex-col items-center justify-center gap-4'>
      <div className='flex gap-4 text-2xl items-center'>
        <TbError404 className='text-color-accent text-4xl' />
        <h1 className=''>Page is not found.</h1>
      </div>

      <div>
        <Button variant='outlined' onClick={() => navigate('/')}>
          move to the Activity Feed
          <TbActivityHeartbeat className='ml-2 text-2xl' />
        </Button>
      </div>
    </div>
  );
}
