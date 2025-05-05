import { createRoot } from 'react-dom/client';
import { Root } from './Root';
document.title = 'Nice Gadgets';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
