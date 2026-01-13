import { HashRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';

export const App = () => {
return (
<HashRouter>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/phones" element={<Catalog />} />
<Route path="/phones/:productId" element={<ProductDetails />} />
</Routes>
</HashRouter>
);
};

export default App;