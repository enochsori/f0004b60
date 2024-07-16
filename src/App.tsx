import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ActivityProvider } from './context/ActivityContext';
import { DarkModeProvider } from './context/DarkModeContext';

import Header from './components/Header';
import Footer from './components/Footer';
import PopupButton from './components/PopupButton';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ActivityProvider>
        <DarkModeProvider>
          <Header />
          <Outlet />
          <Footer />
        </DarkModeProvider>
      </ActivityProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
