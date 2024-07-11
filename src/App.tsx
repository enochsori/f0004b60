import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ActivityProvider } from './context/ActivityContext';
import { DarkModeProvider } from './context/DarkModeContext';

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
    </QueryClientProvider>
  );
}

export default App;
