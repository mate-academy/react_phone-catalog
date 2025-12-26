import ReactDom from 'react-dom/client';
import { Root } from './Root';
import './index.scss';

const root = ReactDom.createRoot(document.getElementById('root') as HTMLElement);

root.render(<Root />);
