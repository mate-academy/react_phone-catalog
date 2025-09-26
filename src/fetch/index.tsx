import React from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from '../Mixins/Root';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(<Root />);
