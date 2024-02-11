import { createRoot } from 'react-dom/client';
import './styles/main.scss';
import { Root } from './Root';
import { GlobalProvider } from './store/State';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <GlobalProvider>
      <Root />
    </GlobalProvider>,
  );
