import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Frame } from './components/Frame';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';

export const App = () => (
  <Routes>
    <Route path="/" element={<Frame />}>
      <Route index element={<HomePage />} />
      <Route path="phones" element={<PhonesPage />} />
    </Route>
  </Routes>
);
