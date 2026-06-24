import { createRoot } from 'react-dom/client';
import { App } from './App';
import './shared/styles/fonts.scss';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
