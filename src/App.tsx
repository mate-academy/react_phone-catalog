import { Route, Routes } from 'react-router-dom';
import './assets/styles/main.scss';
import { Header } from './components/layout/Header';
import { HomePage } from './modules/HomePage';

export const App = () => (
  <div className="App">
    <Header />
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </div>
  </div>
);
