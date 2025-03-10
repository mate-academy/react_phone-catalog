import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Navigation } from './Components/Navigation';

export const App: React.FC = () => {
  return (
    <div className="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
              path="/menu"
              element={
                <>
                  <h1 className="title">menu Page</h1>
                </>
              }
            />
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
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
