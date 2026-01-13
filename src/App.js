import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from './components/Header';

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import ProductDetails from './pages/ProductDetails';
import NotFoundPage from './pages/NotFoundPage';

import {
getPhones,
getTablets,
getAccessories,
} from './api/productsApi';

function App() {
const [products, setProducts] = useState([]);
const [cart, setCart] = useState(() => {
const saved = localStorage.getItem('cart');
return saved ? JSON.parse(saved) : [];
});
const [favorites, setFavorites] = useState(() => {
const saved = localStorage.getItem('favorites');
return saved ? JSON.parse(saved) : [];
});

/* ================= LOAD PRODUCTS ================= */
useEffect(() => {
Promise.all([
getPhones(),
getTablets(),
getAccessories(),
]).then(([phones, tablets, accessories]) => {
setProducts([
...phones,
...tablets,
...accessories,
]);
});
}, []);

/* ================= PERSIST CART & FAVORITES ================= */
useEffect(() => {
localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);

useEffect(() => {
localStorage.setItem('favorites', JSON.stringify(favorites));
}, [favorites]);


const addToCart = (product) => {
setCart(prev => {
const existing = prev.find(
item => item.configId === product.configId
);

if (existing) {
return prev.map(item =>
item.configId === product.configId
? { ...item, quantity: item.quantity + 1 }
: item
);
}

return [...prev, { ...product, quantity: 1 }];
});
};

const removeFromCart = (configId) => {
setCart(prev =>
prev.filter(item => item.configId !== configId)
);
};


const addToFavorites = (product) => {
setFavorites(prev => {
if (prev.some(item => item.configId === product.configId)) {
return prev;
}
return [...prev, product];
});
};

const removeFromFavorites = (identifier) => {
setFavorites(prev =>
prev.filter(item => (item.configId || item.id) !== identifier)
);
};

return (
<>
<Header />

<Routes>
<Route path="/" element={<Home />} />

<Route
path="/phones"
element={
<Catalog
products={products.filter(p => p.category === 'phones')}
cart={cart}
favorites={favorites}
addToCart={addToCart}
addToFavorites={addToFavorites}
/>
}
/>

<Route
path="/tablets"
element={
<Catalog
products={products.filter(p => p.category === 'tablets')}
cart={cart}
favorites={favorites}
addToCart={addToCart}
addToFavorites={addToFavorites}
/>
}
/>

<Route
path="/accessories"
element={
<Catalog
products={products.filter(p => p.category === 'accessories')}
cart={cart}
favorites={favorites}
addToCart={addToCart}
addToFavorites={addToFavorites}
/>
}
/>

<Route
path="/:category/:productId"
element={
<ProductDetails
cart={cart}
favorites={favorites}
addToCart={addToCart}
addToFavorites={addToFavorites}
/>
}
/>

<Route
path="/cart"
element={
<Cart
cart={cart}
removeFromCart={removeFromCart}
/>
}
/>

<Route
path="/favorites"
element={
<Favorites
favorites={favorites}
removeFromFavorites={removeFromFavorites}
/>
}
/>

<Route path="*" element={<NotFoundPage />} />
</Routes>
</>
);
}

export default App;