import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo, useRef } from 'react';

import type { Product } from '../types/Product';
import { loadProducts } from '../data/products';

import { addToCart, isInCart } from '../store/cart';
import { toggleFavorite, isFavorite } from '../store/favorites';

import { getProductPrice } from '../utils/price';
import { resolveImage } from '../utils/image';
import { ProductCard } from '../components/ProductCard';

export const ProductPage = () => {
const params = useParams<{ id: string }>();
const id = params.id;
const navigate = useNavigate();

const [product, setProduct] = useState<Product | null>(null);
const [allProducts, setAllProducts] = useState<Product[]>([]);

const [color, setColor] = useState('');
const [capacity, setCapacity] = useState('');
const [imageIndex, setImageIndex] = useState(0);

const [inCart, setInCart] = useState(false);
const [fav, setFav] = useState(false);

const firstLoadRef = useRef(true);

useEffect(() => {
loadProducts().then(list => {
setAllProducts(list);

const found = list.find(p => id?.includes(p.id)) || null;
setProduct(found);

if (found) {
const parts = id?.split('-') || [];

const capFromUrl = parts[parts.length - 2];
const colorFromUrl = parts[parts.length - 1];

setColor(colorFromUrl || found.colorsAvailable[0]);
setCapacity(capFromUrl || found.capacityAvailable[0]);
setImageIndex(0);
}

if (firstLoadRef.current) {
window.scrollTo({ top: 0, behavior: 'smooth' });
firstLoadRef.current = false;
}
});
}, [id]);

useEffect(() => {
if (!product) return;

const update = () => {
setInCart(isInCart(product.id, color, capacity));
setFav(isFavorite(product.id, color, capacity));
};

update();
window.addEventListener('storage-update', update);
return () => window.removeEventListener('storage-update', update);
}, [product, color, capacity]);

const images = useMemo(() => {
if (!product) return [];

const recolored = product.images.map(img => {
const parts = img.split('/');
if (parts.length >= 3) {
parts[parts.length - 2] = color;
}
return parts.join('/');
});

return recolored.map(resolveImage);
}, [product, color]);

useEffect(() => {
if (!product) return;

const newId = `${product.id}-${capacity}-${color}`;

if (id !== newId) {
navigate(`/product/${newId}`, { replace: true });
}

document.title =
product.name + ' ' + capacity + ' ' + color.replace('-', ' ');
}, [color, capacity, product, id, navigate]);

if (!product) return <p>Loading...</p>;

const price = getProductPrice(product, capacity);
const dynamicTitle =
product.name + ' ' + capacity + ' ' + color.replace('-', ' ');

const recommended = allProducts
.filter(p => p.id !== product.id)
.slice(0, 4);

return (
<div className="product-page" style={{ maxWidth: 1100, margin: '0 auto' }}>
<button onClick={() => navigate(-1)} className="hero-back">
Back
</button>

<div
style={{
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
marginTop: 20,
}}
>
<div
style={{
width: 340,
height: 420,
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
marginBottom: 20,
}}
>
<img
src={images[imageIndex]}
alt={product.name}
style={{
maxWidth: '100%',
maxHeight: '100%',
objectFit: 'contain',
}}
/>
</div>

<div
style={{
display: 'flex',
gap: 12,
overflowX: 'auto',
paddingBottom: 10,
maxWidth: 420,
marginBottom: 40,
justifyContent: 'center',
}}
>
{images.map((img, i) => (
<img
key={img}
src={img}
onClick={() => setImageIndex(i)}
style={{
width: 70,
height: 70,
objectFit: 'contain',
cursor: 'pointer',
borderRadius: 12,
flexShrink: 0,
border:
i === imageIndex
? '2px solid #9fdcff'
: '1px solid #e5e5e5',
opacity: i === imageIndex ? 1 : 0.5,
transition: '0.25s',
}}
/>
))}
</div>

<h1 style={{ fontSize: 30, marginBottom: 10, textAlign: 'center' }}>
{dynamicTitle}
</h1>

<div style={{ fontSize: 26, marginBottom: 30 }}>${price}</div>

<div style={{ marginBottom: 24, textAlign: 'center' }}>
<div style={{ opacity: 0.6, marginBottom: 10 }}>Color</div>

{product.colorsAvailable.map(c => (
<button
key={c}
onClick={() => setColor(c)}
style={{
margin: 6,
fontWeight: c === color ? 700 : 300,
opacity: c === color ? 1 : 0.45,
transform: c === color ? 'scale(1.15)' : 'scale(1)',
transition: '0.25s',
}}
>
{c.replace('-', ' ')}
</button>
))}
</div>

<div style={{ marginBottom: 30, textAlign: 'center' }}>
<div style={{ opacity: 0.6, marginBottom: 10 }}>Capacity</div>

{product.capacityAvailable.map(c => (
<button
key={c}
onClick={() => setCapacity(c)}
style={{
margin: 6,
fontWeight: c === capacity ? 800 : 300,
opacity: c === capacity ? 1 : 0.45,
transform: c === capacity ? 'scale(1.2)' : 'scale(1)',
transition: '0.25s',
}}
>
{c}
</button>
))}
</div>

<div style={{ display: 'flex', gap: 20 }}>
<button
disabled={inCart}
onClick={() => addToCart(product.id, color, capacity)}
>
{inCart ? 'Added to cart' : 'Add to cart'}
</button>

<button
onClick={() => toggleFavorite(product.id, color, capacity)}
>
{fav ? '★ Added to favorites' : '☆ Add to favorites'}
</button>
</div>
</div>

<div style={{ marginTop: 80 }}>
<h2 style={{ marginBottom: 30 }}>You may also like</h2>

<div
style={{
display: 'grid',
gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
gap: 30,
}}
>
{recommended.map(p => (
<ProductCard key={p.id} product={p} />
))}
</div>
</div>
</div>
);
};