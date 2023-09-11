import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { Footer } from './components/Footer';
import { PhonePage } from './pages/PhonePage';

const App = () => (
  <div className="app">
    <Header />

    <section className="section">
      <div className="app__content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="phones">
            <Route index element={<PhonePage />} />
          </Route>
        </Routes>
      </div>
    </section>

    <div className="app__footer">
      <Footer />
    </div>
  </div>
);

export default App;
