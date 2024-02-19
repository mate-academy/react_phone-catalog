// import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// import { Header } from './components/Header';
// import './App.scss';
// import { Footer } from './components/Footer';
// import { ProductDetails } from './Pages/ProductDetails';
// import { PhonesPage } from './Pages/PhonesPage';
import { HomePage } from './Pages/HomePage';
// import { mobiles } from './temp';
// import { useAppDispatch } from './store/hooks/redux';
// import { fetchProducts } from './store/reducers/ActionCreators';

export const App = () => {
  // const dispatch = useAppDispatch();
  // const { products } = useAppSelector(state => state.productsReducer);

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  // console.log(products);

  return (
    <>
      <Router>
        {/* <Header /> */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="phones" element={<PhonesPage items={mobiles} />} />
          <Route path="/phones/:id" element={<ProductDetails />} /> */}
        </Routes>

        {/* <Footer /> */}
      </Router>
    </>
  );
};
