import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { NavBar } from './components/NavBar/NavBar';
import { HomePage } from './pages/HomePage';

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
      </Routes>
    </main>

    <footer className="footer">
      <Footer />
    </footer>
  </div>
);

export default App;
