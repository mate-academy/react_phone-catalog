import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './shared/Header';
import HomePage from './modules/HomePage/HomePage';
import { Footer } from './shared/Footer';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';

export const App = () => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route
        path="*"
        element={
          <main>
            <h1 style={{ textAlign: 'center', color: 'red' }}>Not found</h1>
          </main>
        }
      />
      <Route path="/phones" element={<PhonesPage />} />
    </Routes>
    <Footer />
  </div>
);
