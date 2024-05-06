import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import 'bulma';
import '../src/shared/global/GlobalStyles/globalStyles.scss';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
