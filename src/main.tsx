import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import './assets/vendor/normalize.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

// Import i18n configuration
import './i18n';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback="Loading...">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
)

