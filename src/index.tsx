/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default */
import ReactDOM from 'react-dom';
// import {
//   HashRouter as Router,
//   Route,
//   Navigate,
//   Routes,
// } from 'react-router-dom';

// import App from './App';
// import Header from './components/Blocks/Header';
// import Home from './components/pages/Home';
import './styles/App.scss';
// import Footer from './components/Blocks/Footer';
// import PhonesPage from './components/pages/PhonesPage';
// import TabletsPage from './components/pages/TabletsPage';
// import AccessoriesPage from './components/pages/AccessoriesPage';
// import ProductPage from './components/pages/ProductPage';
import PageRouter from './PageRouter';

ReactDOM.render(
  // <Router>
  //   <Header />
  //   <Routes>
  //     <Route path="/" element={<Home />} />
  //     <Route path="/home" element={<Navigate replace to="/" />} />

  //     <Route path="/phones" element={<PhonesPage />} />
  //     <Route path="/tablets" element={<TabletsPage />} />
  //     <Route path="/accessories" element={<AccessoriesPage />} />
  //     <Route path="/phones/:productId" element={<ProductPage />} />
  //     <Route path="/tablets/:productId" element={<ProductPage />} />
  //     <Route path="/accessories/:productId" element={<ProductPage />} />
  //   </Routes>
  //   <Footer />
  // </Router>
  <PageRouter />,
  document.getElementById('root'),
);
