import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { AppProvider } from './context/AppContext';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';

export const App = () => (
  <div className="App">
    <AppProvider>
      <Header />

      {/* <Menu /> */}

      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="phones" element={<PhonesPage />} />
          <Route path="menu" element={<Menu />} />
        </Routes>
      </main>

      <Footer />
    </AppProvider>
  </div>
);
