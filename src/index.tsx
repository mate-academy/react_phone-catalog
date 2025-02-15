import { createRoot } from 'react-dom/client';
import { App } from './App';
<<<<<<< HEAD

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
=======
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './utils/contexts';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>,
);
>>>>>>> 2ed609b (add)
