import { createRoot } from 'react-dom/client';
import { Root } from '../Root';
import { DeviceProvider } from './context/DeviceContext';
import React from 'react';

createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <DeviceProvider>
            <Root />
        </DeviceProvider>
    </React.StrictMode>
);
