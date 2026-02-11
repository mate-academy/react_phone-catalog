import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { DataProvider } from './context/ContextProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <DataProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </DataProvider>,
);
