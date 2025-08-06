import './App.scss';
import { Footer } from './component/Footer/Footer';
import { Headers } from './component/Header/Header';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './Page/HomePage/HomePage';
import { PhonesPage } from './Page/PhonesPage/PhonesPage';
import { TabletsPage } from './Page/TabletsPage';
import { AccessoriesPage } from './Page/AccessoriesPage';

export const App = () => {
  return (
    <>
      <div className="App">
        <Headers />

        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />

          <Route path="/tablets" element={<TabletsPage />} />

          <Route path="/accessories" element={<AccessoriesPage />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
};
