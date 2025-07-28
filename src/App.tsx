import './App.scss';
import { Footer } from './component/Footer/Footer';
import { Headers } from './component/Header/Header';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './Page/HomePage/HomePage';
import { PhonesPage } from './Page/PhonesPage/PhonesPage';

export const App = () => {
  return (
    <>
      <div className="App">
        <Headers />

        <Routes>
          <Route path="/" element={<App />}></Route>

          <Route index element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
};
