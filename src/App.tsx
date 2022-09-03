import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/HomePage';

const App = () => (
  <div className="App">
    <div className="wrapper">
      <Header />
      <main className="main page__section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </div>
);

export default App;
