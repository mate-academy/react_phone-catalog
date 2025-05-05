import { createRoot } from 'react-dom/client';
import { App } from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
