import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { NavBar } from './components/NavBar/NavBar';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';

const App = () => (
  <div className="App">
    <header className="header">
      <NavBar />
    </header>

    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route index element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="/phones" element={<PhonesPage />} />
        <Route path="tablets" element={<TabletsPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />
      </Routes>
    </main>

    <footer className="footer">
      <Footer />
    </footer>
  </div>
);

export default App;
