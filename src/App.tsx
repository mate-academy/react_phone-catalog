import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';

const App = () => (
  <div className="wrapper App">
    <Header />
    <main className="main App__main">
      <div className="main__content">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </main>
    <Footer />
  </div>
);

export default App;
