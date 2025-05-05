import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { Home } from './modules/Home';
import { ContextProvider } from './AppHooks';
import { Phones } from './modules/Phones';
import { Tablets } from './modules/Tablets';
import { Accessories } from './modules/Accessories';
import { Favourites } from './modules/Favourites';
import { Cart } from './modules/Cart';
import { DeviceDetails } from './modules/DeviceDetails';

export const Root = () => {
  return (
    <Router>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="phones" element={<Phones />} />
            <Route path="tablets" element={<Tablets />} />
            <Route path="accessories" element={<Accessories />} />
            <Route path="favourites" element={<Favourites />} />
            <Route path="cart" element={<Cart />} />

            <Route path="phones/:productId" element={<DeviceDetails />} />
            <Route path="tablets/:productId" element={<DeviceDetails />} />
            <Route path="accessories/:productId" element={<DeviceDetails />} />

            <Route path="*" element={<Home />} />
          </Route>
          <Route path="home" element={<Navigate to="/" replace />} />
        </Routes>
      </ContextProvider>
    </Router>
  );
};
