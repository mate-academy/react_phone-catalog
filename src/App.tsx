import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './Components/Footer/Footer';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { HomePage } from './Pages/HomePage/HomePage';
import { PhonePage } from './Pages/PhonePage/PhonePage';
import './Style/App.scss';

const App: FC = () => (
  <div className="App">
    <Header />
    <Main>
      <Routes>
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<PhonePage />} />
      </Routes>
    </Main>
    <Footer />
  </div>
);

export default App;
