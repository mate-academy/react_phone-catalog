import './App.scss';
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomeTab } from './components/HomeTab/HomeTab';
import { Footer } from './components/footer/Footer';
import { PhonesTab } from './components/PhonesTab/PhonesTab';
import { HeaderProvider } from './provider/HeaderContext';
import { FavoritePhones } from './components/favoritesPhones/FavoritePhones';
import { Basket } from './components/basket/Basket';
import { Info } from './components/info/Info';
import { PhoneDetails } from './components/phoneDetails/PhoneDetails';
import { Menu } from './components/menu/Menu';
import { Rigth } from './components/rights/Right';

const App = () => {
  return (
    <HashRouter>
      <HeaderProvider>
        <div className="App">
          <Header />
          <main className="section">
            <Routes>
              <Route path="home" element={<Navigate to="/" />} />
              <Route path="/" element={<HomeTab />} />
              <Route path="phones" element={<PhonesTab />} />
              <Route path="favorits" element={<FavoritePhones />} />
              <Route path="basket" element={<Basket />} />
              <Route path="tablets" element={<Info />} />
              <Route path="accessoiries" element={<Info />} />
              <Route path="/:phoneId" element={<PhoneDetails />} />
              <Route path="menu" element={<Menu />} />
              <Route path="right" element={<Rigth />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HeaderProvider>
    </HashRouter>
  );
};

export default App;
