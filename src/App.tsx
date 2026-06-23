import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer/Footer';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { HomePage } from './modules/HomePage/HomePage';
import { CategoryPage } from './modules/Categories/components/CategoryPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/phones" element={<CategoryPage category="phones" />} />
        <Route path="/tablets" element={<CategoryPage category="tablets" />} />
        <Route
          path="/accessories"
          element={<CategoryPage category="accessories" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
