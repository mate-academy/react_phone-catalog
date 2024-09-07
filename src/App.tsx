import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { ProductsProvider } from './context/ProductsProvider';
import { TabletsProvider } from './context/TabletProvider';
import { AccessoriesProvider } from './context/AccessoriesProvider';
import { PhonesProvider } from './context/PhonesProvider';
import { PhonePage } from './components/PhonePage/PhonePage';

export const App = () => {
  return (
    <div className="App">
      <ProductsProvider>
        <TabletsProvider>
          <AccessoriesProvider>
            <PhonesProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/phones" element={<PhonePage />} />
                {/* <Route path="/" element={<HomePage />} />
                <Route path="/" element={<HomePage />} /> */}
              </Routes>
            </PhonesProvider>
          </AccessoriesProvider>
        </TabletsProvider>
      </ProductsProvider>
    </div>
  );
};
