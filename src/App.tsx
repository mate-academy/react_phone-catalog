import './styles/main.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { Footer } from './components/Footer';
import { PhonesPage } from './pages/PhonesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';

// const App = () => {
//   return (
//     <>
//       <Header />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="phones">
//           <Route index element={<PhonesPage />} />
//           <Route path=":productId" element={<ProductDetailsPage />} />
//         </Route>
//         <Route
//           path="*"
//           element={<h1 className="title">Page not found</h1>}
//         />
//       </Routes>
//       <Footer />
//     </>
//   );
// };

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/phones/:productId" element={<ProductDetailsPage />} />
        <Route path="/Cart" element={<CartPage />} />
        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
