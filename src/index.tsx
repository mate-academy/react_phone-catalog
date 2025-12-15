import { createRoot } from 'react-dom/client';
import './index.scss';
import { Root } from './app/Root';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(<Root />);
