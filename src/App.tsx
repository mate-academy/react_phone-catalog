import { Navigate, Route, Routes } from 'react-router-dom';
import '../src/App.scss';
import '../src/modules/shared/styles/base/_base.scss';
import { Header } from './modules/shared/components/Header/Header';
import { HomePage } from './modules/HomePage/HomePage';

export const App = () => (
  <div className="app">
    <h1 className="visually-hidden">Phone Catalog</h1>
    <Header />
    <div className="main">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/home" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </div>
    <div className="footer">FOOTER</div>
  </div>
);
