import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { NavBar } from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { Footer } from './components/Footer/Footer';

export const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="container">
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <footer>
        <Footer />
        </footer>
      </div>
    </>
  );
};

export default App;
