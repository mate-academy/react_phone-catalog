import { Route, Routes } from 'react-router-dom';

import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './routes/HomePage/HomePage';
import { PhonesPage } from './routes/PhonesPage/PhonesPage';
import { TabletsPage } from './routes/TabletsPage/TabletsPage';
import { AccessoriesPage } from './routes/AccessoriesPage/AccessoriesPage';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Navbar />

      <main className="App__main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
