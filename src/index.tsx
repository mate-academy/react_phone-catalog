import { createRoot } from 'react-dom/client';
// import { Root } from './Root';
import { AppWithContext } from './AppWithContext';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(<AppWithContext />);
