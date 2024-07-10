import React, { useContext, useEffect } from 'react';
import { TbActivityHeartbeat } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { ActivityContext } from '../context/ActivityContext';

export default function ArchiveFeed() {
  const context = useContext(ActivityContext);

  useEffect(() => {
    context?.setSelectedOption('all');
  }, []);

  return (
    <div className='shared-container-style'>
      <h2>Archive feed</h2>
      <Link to='/'>
        <TbActivityHeartbeat className='hover:scale-105 hover:text-color-accent-second' />
      </Link>
    </div>
  );
}
