import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ActivityProvider } from './context/ActivityContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ActivityProvider>
        <Header />
        <Outlet />
        <Footer />
      </ActivityProvider>
    </QueryClientProvider>
  );
}

export default App;
