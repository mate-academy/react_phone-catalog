import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import './fonts.scss';
import React from 'react';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(<Root />);
}
