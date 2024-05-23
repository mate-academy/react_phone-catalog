import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { ContextProvider } from './store/store';
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ContextProvider>
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  </ContextProvider>,
);
