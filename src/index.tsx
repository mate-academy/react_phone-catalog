import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/index.scss';
import React from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { CatalogPage } from './modules/CatalogPage';
import { ProductsType } from './types/ProductsType';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';
import { NotFoundPage } from './modules/NotFoundPage';

const categories = [
  ProductsType.Phones,
  ProductsType.Tablets,
  ProductsType.Accessories,
];

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        {categories.map(category => (
          <Route key={category} path={category}>
            <Route index element={<CatalogPage category={category} />} />
            <Route
              path=":productId"
              element={<ProductDetailsPage category={category} />}
            />
          </Route>
        ))}

        <Route path={'favorites'}>
          <Route index element={<FavoritesPage />} />
        </Route>

        <Route path={'cart'}>
          <Route index element={<CartPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>,
);

// import { createRoot } from 'react-dom/client';
// import React from 'react';
// import { RouterProvider, createHashRouter } from 'react-router-dom';
// import { App } from './App';
// import './styles/index.scss';
// import { HomePage } from './modules/HomePage';
// import { CatalogPage } from './modules/CatalogPage';
// import { ProductsType } from './types/ProductsType';
// import { ProductDetailsPage } from './modules/ProductDetailsPage';

// // 🔧 Створюємо маршрути через createHashRouter
// const router = createHashRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         index: true,
//         element: <HomePage />,
//       },
//       {
//         path: ProductsType.Phones,
//         children: [
//           {
//             index: true,
//             element: <CatalogPage category={ProductsType.Phones} />,
//           },
//           {
//             path: ':productId',
//             element: <ProductDetailsPage category={ProductsType.Phones} />,
//           },
//         ],
//       },
//       {
//         path: ProductsType.Tablets,
//         children: [
//           {
//             index: true,
//             element: <CatalogPage category={ProductsType.Tablets} />,
//           },
//         ],
//       },
//       {
//         path: ProductsType.Accessories,
//         children: [
//           {
//             index: true,
//             element: <CatalogPage category={ProductsType.Accessories} />,
//           },
//         ],
//       },
//       {
//         path: '*',
//         element: <h1>Not Found</h1>,
//       },
//     ],
//   },
// ]);

// // 🔧 Рендеримо через RouterProvider
// createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// );
