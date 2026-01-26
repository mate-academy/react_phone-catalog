import { createRoot } from 'react-dom/client';

import './styles/main.scss';
import 'bulma/css/bulma.css';

// import { App } from './App';
import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
