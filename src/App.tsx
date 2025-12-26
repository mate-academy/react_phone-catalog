import './App.scss';
import './styles/globals.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { HomePage } from './components/Home/HomePage';
import { Route, Routes } from 'react-router-dom';
import { MobilePhones } from './components/MobilePhones/MobilePhones';
import { PhonePage } from './components/PhonePage/PhonePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Tablets } from './components/Tablets/Tablets';

export const App = () => (
  <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage /> }/>
          <Route path="/phones" element={<MobilePhones />} />
          <Route path="/tablets" element={<Tablets />} />
          <Route path="/phones/:phoneId" element={<PhonePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
  </div>
);
