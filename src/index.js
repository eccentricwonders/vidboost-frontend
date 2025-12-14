import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css';
import AppRoutes from './AppRoutes';

const clerkPubKey = 'pk_live_Y2xlcmsuanNtZ2F4LmNvbSQ';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={clerkPubKey}>
        <AppRoutes />
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>
);
