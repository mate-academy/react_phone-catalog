import { Navigate, Route, Routes } from 'react-router-dom';
import '../src/App.scss';
import '../src/modules/shared/styles/base/_base.scss';
import { Header } from './modules/shared/components/Header/Header';
import { HomePage } from './modules/HomePage/HomePage';
import { Favourites } from './modules/Favourites/Favourites';
import { Footer } from './modules/shared/components/Footer/Footer';

export const App = () => (
  <div className="app">
    <h1 className="visually-hidden">Phone Catalog</h1>
    <Header />
    <div className="main">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/home" element={<Navigate to="/" replace />}></Route>
        <Route path="/favourites" element={<Favourites />}></Route>
      </Routes>
    </div>
    <Footer />
  </div>
);
