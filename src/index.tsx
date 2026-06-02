import { createRoot } from 'react-dom/client';
import App from './App';
import './modules/shared/grid/grid.scss';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
