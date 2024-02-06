import { createRoot } from 'react-dom/client';
import { Root } from './Root';

const container = document.querySelector('#root') as HTMLElement;
const root = createRoot(container);

root.render(<Root />);
