/* eslint max-len: "off" */
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { PathProvider } from './components/context/PathContext';
import { CardAndFavouritesProvider } from './components/context/CardAndFavouritesContext';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';

export const App = () => (
  <CardAndFavouritesProvider>
    <PathProvider>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route />
            <Route />
          </Routes>
        </main>
      </div>
    </PathProvider>
  </CardAndFavouritesProvider>
);
