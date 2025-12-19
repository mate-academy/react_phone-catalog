import './App.scss';
import './styles/globals.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { HomePage } from './components/Home/HomePage';
import { Route, Routes } from 'react-router-dom';
import { MobilePhones } from './components/MobilePhones/MobilePhones';

export const App = () => (
  <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage /> }/>
          <Route path="/phones" element={<MobilePhones />} />
        </Routes>
      </main>

      <Footer />
  </div>
);
