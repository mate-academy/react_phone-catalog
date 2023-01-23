import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/HomePage';
import { DeviceCatalog } from './pages/DeviceCatalog';
import { TargetPhone } from './pages/TargetPhone';
import { EmptyPage } from './pages/EmptyPage';
import { PhoneProvider } from './utils/PhoneContext';
import { BagPage } from './pages/BagPage';
import { FavPage } from './pages/FavPage';

const App = () => {
  return (
    <PhoneProvider>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />

          <Route path="phones">
            <Route index element={<DeviceCatalog />} />
            <Route path=":deviceId" element={<TargetPhone />} />
          </Route>

          <Route path="bag" element={<BagPage />} />
          <Route path="favorite" element={<FavPage />} />

          <Route path="*" element={<EmptyPage />} />
        </Routes>
        <Footer />
      </div>
    </PhoneProvider>
  );
};

export default App;
