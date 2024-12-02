import { createRoot } from 'react-dom/client';
import { Root } from './Root';

const storedTheme = localStorage.getItem('theme') || 'light-theme';

// Add `storedTheme` at the beginning to avoid FOUC (Flash of Unstyled Content).
// This is because the browser first renders the page without styles,
// and then applies them.
document.documentElement.className = storedTheme;

const setFavicon = (iconPath: string, type: string = 'image/x-icon') => {
  const linkElement = document.createElement('link');

  linkElement.rel = 'icon';
  linkElement.href = iconPath;
  linkElement.type = type;

  document.head.appendChild(linkElement);
};

setFavicon('/img/favicon.svg', 'image/svg+xml');

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
