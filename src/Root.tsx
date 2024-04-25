import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { CatalogProvider } from './pages/CatalogContext';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { PhonePage } from './pages/PhonePage/PhonePage';
// import { ProductDetails } from './pages/ProductDetailsPage/ProductDetailsPage';

export const Root = () => {
  return (
  <CatalogProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
            <Route path={'/phones'}> 
                <Route index element={<PhonePage/> }/> 
              {/* <Route path=":productId" element={<ProductDetails />} />  */}
            </Route>
            <Route path={`/tablets`}> 
                {/* <Route index element={<TabletsPage/> }/>  */}
              {/* <Route path=":productId" element={<ProductDetails />} />  */}
            </Route>
            <Route path={`/accessories`}> 
                {/* <Route index element={<AccessoriesPage/> }/>  */}
              {/* <Route path=":productId" element={<ProductDetails />} />  */}
            </Route>
          <Route path="/favorites"></Route>
          <Route path="/cart"></Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </CatalogProvider>
  )
};
