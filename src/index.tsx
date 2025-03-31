import { createRoot } from 'react-dom/client';
import './assets/styles/main.scss';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
