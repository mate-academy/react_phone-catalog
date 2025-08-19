import { createRoot } from 'react-dom/client';
import { App } from './modules/App/App';

import './styles/global.scss';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
