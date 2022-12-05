import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { PhonesPage } from './pages/PhonesPage';

const App = () => (
  <div className="App">
    <Header />
    <div className="content-wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </div>
    <Footer />
  </div>
);

export default App;
