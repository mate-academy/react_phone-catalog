import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import './App.scss';

export const App = () => (
  <div className="App">
    <h1>Product Catalog H1</h1>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<div>Home PAGE</div>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </main>
    <footer>Підвал</footer>
  </div>
);
