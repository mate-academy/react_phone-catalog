import { createRoot } from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma';
import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLDivElement).render(<Root />);
