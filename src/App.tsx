import { Route, Routes } from 'react-router-dom';
import './assets/styles/main.scss';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { HomePage } from './modules/HomePage';

export const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="wrapper">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
