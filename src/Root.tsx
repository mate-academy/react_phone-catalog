import React, { useContext } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { CatalogContext, CatalogProvider } from './pages/CatalogContext';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import { ProductDetails } from './pages/ProductDetailsPage/ProductDetailsPage';
import { Categories } from './types/categories';

export const Root = () => {
  const { categories } = useContext(CatalogContext);

  return (
  <CatalogProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          
            {categories.map((category: Categories) => {
     
              return (
              <Route path={`/${category.type}`} key={category.type}> 
                  <Route index element={
                    <ProductsPage 
                      products={category.items} 
                      title={category.type} />
                  } /> 
                    <Route path=":productId" element={<ProductDetails />} /> 
              </Route>
              )
            })}

          <Route path="/favorites"></Route>
          <Route path="/cart"></Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </CatalogProvider>
  )
};
