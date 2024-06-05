import { createRoot } from 'react-dom/client';
import '../src/shared/global/globalStyles/globalStyles.scss';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
