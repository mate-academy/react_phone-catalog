/* eslint-disable @typescript-eslint/no-use-before-define */
// @ts-expect-error: React import required for ESLint
import React from 'react';

import './styles/main.scss';

import { createRoot } from 'react-dom/client';

import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
