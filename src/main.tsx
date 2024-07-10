import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound.tsx';
import ActivityFeed from './pages/ActivityFeed.tsx';
import ActivityDetail from './pages/ActivityDetail.tsx';
import ArchiveFeed from './pages/ArchiveFeed.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <ActivityFeed />,
      },
      {
        path: '/:id',
        element: <ActivityDetail />,
      },
      {
        path: '/archive',
        element: <ArchiveFeed />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
