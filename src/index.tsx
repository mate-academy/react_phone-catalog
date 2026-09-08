import { createRoot } from 'react-dom/client';
import './i18n'; // Імпортуємо налаштування i18n
import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
