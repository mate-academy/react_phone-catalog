import { createRoot } from 'react-dom/client';
import 'bulma';
import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
