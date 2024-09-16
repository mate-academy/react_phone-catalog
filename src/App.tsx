import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { ProductsProvider } from './context/ProductsProvider';
import { TabletsProvider } from './context/TabletProvider';
import { AccessoriesProvider } from './context/AccessoriesProvider';
import { PhonesProvider } from './context/PhonesProvider';
import { PhonePage } from './components/PhonePage/PhonePage';
import { ProductDetailsPage } from './components/ProductDetailsPage/ProductDetailsPage';

export const App = () => {
  return (
    <div className="App">
      <ProductsProvider>
        <TabletsProvider>
          <AccessoriesProvider>
            <PhonesProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/phones"
                  element={<PhonePage filter={'phones'} />}
                />
                <Route
                  path="/tablets"
                  element={<PhonePage filter={'tablets'} />}
                />
                <Route
                  path="/accessories"
                  element={<PhonePage filter={'accessories'} />}
                />
                <Route
                  path="/:category/:itemId"
                  element={<ProductDetailsPage />}
                />
              </Routes>
            </PhonesProvider>
          </AccessoriesProvider>
        </TabletsProvider>
      </ProductsProvider>
    </div>
  );
};
