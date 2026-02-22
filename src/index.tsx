import { createRoot } from 'react-dom/client';

import './styles/custom_bulma.scss';
import './styles/main.scss';

import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
