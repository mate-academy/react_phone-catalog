import { createRoot } from 'react-dom/client';
import './index.scss';
import { Root } from './app/Root';
// import { App } from './App';

// createRoot(document.getElementById('root') as HTMLElement).render(<App />);
const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(<Root />);
