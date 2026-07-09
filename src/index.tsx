import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import { Root } from './Root';
import './index.scss';
import './utils/i18n';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
