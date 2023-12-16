import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { Footer } from './components/Footer';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { MyContextProvider } from './context/context';

export const App = () => {
  return (
    <div className="App">
      <MyContextProvider>
        <Header />
        <Routes>
          <Route
            path="/"
            element={(
              <HomePage />
            )}
          />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route
            path="/phones"
            element={<PhonesPage />}
          />
          <Route
            path="/tablets"
            element={
              <TabletsPage />
            }
          />
          <Route
            path="/accessories"
            element={<AccessoriesPage />}
          />
          <Route
            path="/*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Routes>

        <Footer />
      </MyContextProvider>
    </div>
  );
};
