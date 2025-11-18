import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '../Layout';
import { HomePageLazy, ProductPageLazy } from './lazy';
import { ProductName } from '../types/prodName';

export const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePageLazy />}/>

          {/* <Route path="phones"> */}
          <Route path="/">
            <Route
              index
              element={<ProductPageLazy type={ProductName.phones} />}
            />
            {/* <Route path=":productId" element={<DetailsPageLazy />} /> */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
