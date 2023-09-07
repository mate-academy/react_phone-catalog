import './App.scss';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomeTab } from './components/HomeTab/HomeTab';
import { Footer } from './components/footer/Footer';
import { PhonesTab } from './components/PhonesTab/PhonesTab';
import { HeaderProvider } from './provider/HeaderContext';

const App = () => {
  return (
    <BrowserRouter>
      <HeaderProvider>
        <div className="App">
          <Header />
          <main className="section">
            <Routes>
              <Route path="/home" element={<Navigate to="/" />} />
              <Route path="/" element={<HomeTab />} />
              <Route path="/phones" element={<PhonesTab />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HeaderProvider>
    </BrowserRouter>
  );
};

export default App;
