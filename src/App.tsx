import './App.scss';

import React from 'react';

import {
  RouterProvider,
} from 'react-router-dom';

import NightsStayIcon from '@mui/icons-material/NightsStay';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { appRoutes } from './Routes/Routes';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <NightsStayIcon />
      <React.StrictMode>
        <RouterProvider router={appRoutes} />
      </React.StrictMode>
      <Footer />
    </div>
  );
};
