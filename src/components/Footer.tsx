import { useContext, useEffect } from 'react';
import { BsTelephoneInbound } from 'react-icons/bs';
import { BsTelephoneOutbound } from 'react-icons/bs';
import { MdSdStorage } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { ActivityContext } from '../context/ActivityContext';

export default function Footer() {
  const location = useLocation();
  const context = useContext(ActivityContext);

  const handleSelectOption = (type: 'inbound' | 'outbound') => {
    context?.selectedOption === type
      ? context?.setSelectedOption('all')
      : context?.setSelectedOption(type);
  };

  return (
    <footer className='w-full h-[60px]  rounded-b-lg dark:bg-bg-dark-dark border-t dark:border-color-dark-grey flex items-center justify-between text-2xl px-8 dark:text-color-text-dark'>
      <BsTelephoneInbound
        className={`shared-icon-style ${
          context?.selectedOption === 'inbound' && 'text-color-accent'
        }`}
        onClick={() =>
          location.pathname === '/' && handleSelectOption('inbound')
        }
      />
      <BsTelephoneOutbound
        className={`shared-icon-style ${
          context?.selectedOption === 'outbound' && 'text-color-accent'
        }`}
        onClick={() =>
          location.pathname === '/' && handleSelectOption('outbound')
        }
      />
      <Link to='/archive'>
        <MdSdStorage
          className={`shared-icon-style ${
            location.pathname === '/archive' && 'text-color-accent'
          }`}
        />
      </Link>
    </footer>
  );
}
