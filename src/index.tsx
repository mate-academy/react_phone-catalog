import { createRoot } from 'react-dom/client';
import './styles/_base.scss';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
