import { createRoot } from 'react-dom/client';
import { App } from './App';

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light' || savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', savedTheme);
} else {
  document.documentElement.setAttribute('data-theme', 'dark');
}

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
