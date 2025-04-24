import { createRoot } from 'react-dom/client';
import { Root } from './Root';

import '../public/fonts/Mont-Bold.otf';
import '../public/fonts/Mont-Regular.otf';
import '../public/fonts/Mont-SemiBold.otf';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
