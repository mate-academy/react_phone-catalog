import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './Components/Header/Header';
import './Style/App.scss';

const App: FC = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
  </div>
);

export default App;
