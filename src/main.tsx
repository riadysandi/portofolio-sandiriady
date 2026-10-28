import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GlobalErrorBoundary>
  </StrictMode>,
);
