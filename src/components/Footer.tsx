import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ActivityContext } from '../context/ActivityContext';
import { DarkModeContext } from '../context/DarkModeContext';

import { BsTelephoneInbound } from 'react-icons/bs';
import { BsTelephoneOutbound } from 'react-icons/bs';
import { MdSdStorage } from 'react-icons/md';
import { MdDarkMode } from 'react-icons/md';
import { MdOutlineLightMode } from 'react-icons/md';
import PopupButton from './PopupButton';

export default function Footer() {
  const location = useLocation();
  const context = useContext(ActivityContext);
  const darkModeContext = useContext(DarkModeContext);

  // filter handler
  const handleSelectOption = (type: 'inbound' | 'outbound') => {
    context?.selectedOption === type
      ? context?.setSelectedOption('all')
      : context?.setSelectedOption(type);
  };

  console.log(location.pathname);

  // defined shared class name
  const classNames =
    location.pathname === '/'
      ? 'hover:scale-110 hover:text-color-accent hover:cursor-pointer'
      : 'opacity-50';
  return (
    <footer className='w-full h-[60px]  rounded-b-lg dark:bg-bg-dark-dark border-t dark:border-color-dark-grey border-color-light-grey flex items-center justify-between text-2xl px-8 dark:text-color-text-dark relative'>
      <BsTelephoneInbound
        className={`${classNames} ${
          context?.selectedOption === 'inbound' && 'text-color-accent'
        }`}
        onClick={() =>
          location.pathname === '/' && handleSelectOption('inbound')
        }
      />
      <BsTelephoneOutbound
        className={`${classNames} ${
          context?.selectedOption === 'outbound' && 'text-color-accent'
        }`}
        onClick={() =>
          location.pathname === '/' && handleSelectOption('outbound')
        }
      />
      <Link to='/archive'>
        <MdSdStorage
          className={`shared-icon-style hover:scale-110 ${
            location.pathname === '/archive' && 'text-color-accent'
          }`}
        />
      </Link>

      <div
        className='hover:cursor-pointer hover:scale-125 hover:cur'
        onClick={darkModeContext?.toggleDarkMode}
      >
        {darkModeContext?.darkMode ? <MdOutlineLightMode /> : <MdDarkMode />}
      </div>

      <div className=' absolute bottom-16 right-2'>
        <PopupButton />
      </div>
    </footer>
  );
}
