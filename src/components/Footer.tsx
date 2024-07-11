import { useContext } from 'react';
import { BsTelephoneInbound } from 'react-icons/bs';
import { BsTelephoneOutbound } from 'react-icons/bs';
import { MdSdStorage } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { ActivityContext } from '../context/ActivityContext';
import { MdDarkMode } from 'react-icons/md';
import { MdOutlineLightMode } from 'react-icons/md';
import { DarkModeContext } from '../context/DarkModeContext';

export default function Footer() {
  const location = useLocation();
  const context = useContext(ActivityContext);
  const darkModeContext = useContext(DarkModeContext);

  const handleSelectOption = (type: 'inbound' | 'outbound') => {
    context?.selectedOption === type
      ? context?.setSelectedOption('all')
      : context?.setSelectedOption(type);
  };

  const classNames =
    location.pathname !== '/archive'
      ? 'hover:scale-110 hover:text-color-accent'
      : 'opacity-50';
  return (
    <footer className='w-full h-[60px]  rounded-b-lg dark:bg-bg-dark-dark border-t dark:border-color-dark-grey border-color-light-grey flex items-center justify-between text-2xl px-8 dark:text-color-text-dark'>
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
        className='hover:cursor-pointer hover:scale-125'
        onClick={darkModeContext?.toggleDarkMode}
      >
        {darkModeContext?.darkMode ? <MdOutlineLightMode /> : <MdDarkMode />}
      </div>
    </footer>
  );
}
