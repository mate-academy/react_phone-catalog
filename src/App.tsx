import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';

export const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  </div>
);
