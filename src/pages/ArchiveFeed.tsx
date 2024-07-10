import React, { useContext, useEffect } from 'react';
import { TbActivityHeartbeat } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { ActivityContext } from '../context/ActivityContext';
import PopupButton from '../components/PopupButton';

export default function ArchiveFeed() {
  const context = useContext(ActivityContext);

  useEffect(() => {
    context?.setSelectedOption('all');
  }, []);

  return (
    <div className='shared-container-style  flex flex-col justify-between'>
      <div>
        <h2>Archive feed</h2>
      </div>
      <div className='relative'>
        <PopupButton />
      </div>
    </div>
  );
}
