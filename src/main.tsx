import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import '@/shared/i18n/i18n';
import '@/app/styles/tailwind.css';
import '@/app/styles/globals.scss';
import { useThemeStore } from '@/shared/store/useThemeStore';

document.documentElement.dataset.theme = useThemeStore.getState().theme;

useThemeStore.subscribe((state) => {
  document.documentElement.dataset.theme = state.theme;
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
