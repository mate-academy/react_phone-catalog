import { Route, Routes } from 'react-router-dom';

import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './routes/HomePage/HomePage';
import { PhonesPage } from './routes/PhonesPage/PhonesPage';
import './App.scss';

const App = () => (
  <div className="App">
    <header className="App__header">
      <Navbar />
    </header>

    <main className="App__main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<PhonesPage />} />
      </Routes>
    </main>

    <Footer />
  </div>
);

export default App;
