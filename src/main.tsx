import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { SearchHistoryProvider } from './context/SearchHistoryContext';
import { App } from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <SearchHistoryProvider>
        <App />
      </SearchHistoryProvider>
    </ErrorBoundary>
  </StrictMode>,
);
