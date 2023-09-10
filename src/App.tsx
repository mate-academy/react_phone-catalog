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
            </Routes>
          </main>
          <Footer />
        </div>
      </HeaderProvider>
    </HashRouter>
  );
};

export default App;
