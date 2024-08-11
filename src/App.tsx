import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './Components/HomePage/HomePage';

export const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="default" element={<h1>Product Catalog</h1>} />
        <Route path="home" element={<HomePage />} />
      </Route>
    </Routes>
  </div>
);
