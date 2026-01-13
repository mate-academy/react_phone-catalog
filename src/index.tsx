import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import './styles/main.scss';

// import { App } from './App';
import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
