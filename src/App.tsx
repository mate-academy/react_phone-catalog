import { Routes, Route } from 'react-router-dom';
import { HomePage } from './Pages/HomePage/HomePage';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import './styles/global.scss';
// eslint-disable-next-line
import { AddAndFavoritesProvider } from './components/context/AddAndFavoritesContext';
import { PathProvider } from './components/context/PathContext';

export const App = () => {
  return (
    <AddAndFavoritesProvider>
      <PathProvider>
        <div className="app">
          <Header />

          <main className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </PathProvider>
    </AddAndFavoritesProvider>
  );
};
