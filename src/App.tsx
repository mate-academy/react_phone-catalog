import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { NavBar } from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';

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
      </div>
    </>
  );
};

export default App;
