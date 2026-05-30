/* eslint-disable max-len */
import { HashRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/index';
import { CatalogPage } from './modules/Catalog/CatalogPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { NotFoundPage } from './modules/shared/NotFoundPage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/catalog/:type" element={<CatalogPage />} />
        <Route path="/:category/:productId" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route
          path="rights"
          element={
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'left',
                minHeight: '50vh',
                padding: '20px',
                gap: '20px',
              }}
            >
              <h1>You better not test my nerves and comply with the license</h1>
              <h5 style={{ maxWidth: '800px' }}>
                The "Don’t Test Me" License (DTML) v0.0.1 Copyright (c) 2026 Me,
                Myself & I <br /> 1. You are allowed to: - Use this project. -
                Modify this project. - Stare at this project at 3AM questioning
                your life choices.
                <br /> 2. You are NOT allowed to: - Pretend you wrote it. - Sell
                it for millions without at least buying me coffee. - Remove this
                license and act mysterious about it. <br /> 3. If you break
                these rules: I will be mildly disappointed. And honestly, that’s
                worse. <br /> 4. Warranty: This software comes with absolutely
                no warranty. If it breaks, it was part of the design. If it
                works, that was accidental. <br /> 5. Legal stuff: By using this
                project, you agree that I am cool and you respect the vibes. End
                of license. Don’t test me.
              </h5>
            </div>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </HashRouter>
);
