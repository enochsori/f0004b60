import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { DarkModeContextType } from '../services/types';

// export const DarkModeContext = createContext();
export const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    // setDarkMode((prevMode) => !prevMode);
    setDarkMode(!darkMode);
    updateDarkMode(!darkMode);
  };

  useEffect(() => {
    // check user's previous mode setting in browser local storage and os setting.
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('prefers-color-scheme: dark').matches);

    // initial setting using user's preference
    setDarkMode(isDark);
    updateDarkMode(isDark);
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// implementing dark mode using darkMode state : directly add a class in DOM
function updateDarkMode(darkMode: boolean) {
  if (darkMode) {
    document.documentElement.classList.add('dark');
    // store changed mode in localStorage
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    // store changed mode in localStorage
    localStorage.theme = 'light';
  }
}

// effective way to use context!
// no need to remember the context name in the component where need to use this context.
export const useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
