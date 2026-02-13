import { createRoot } from 'react-dom/client';
import '../src/shared/global/globalStyles/globalStyles.scss';

import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
