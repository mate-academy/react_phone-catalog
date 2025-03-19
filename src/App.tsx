import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Navigation } from './Components/Navigation';
import { Menu } from './Components/Menu';
import { Home } from './Components/Home';
import { Footer } from './Components/Footer';
import { NotFoundPage } from './Components/NotFoundPage';

export const App: React.FC = () => {
  return (
    <div className="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
              path="/phones"
              element={
                <>
                  <h1 className="title">phones Page</h1>
                </>
              }
            />
            <Route
              path="/tablets"
              element={
                <>
                  <h1 className="title">tablets Page</h1>
                </>
              }
            />
            <Route
              path="/accessories"
              element={
                <>
                  <h1 className="title">accessories Page</h1>
                </>
              }
            />
            <Route
              path="/favourites"
              element={
                <>
                  <h1 className="title">favourites Page</h1>
                </>
              }
            />
            <Route
              path="/shopping"
              element={
                <>
                  <h1 className="title">shopping Page</h1>
                </>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {<Menu />}
      </main>

      <Footer />
    </div>
  );
};
