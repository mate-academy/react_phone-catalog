import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';

import type { Product } from '../types/Product';
import { loadProducts } from '../data/products';

import { addToCart, isInCart } from '../store/cart';
import { toggleFavorite, isFavorite } from '../store/favorites';

import { getProductPrice } from '../utils/price';
import { resolveImage } from '../utils/image';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const ProductPage = () => {
const { id: productId } = useParams<{ id: string }>();
const navigate = useNavigate();

const [allProducts, setAllProducts] = useState<Product[]>([]);

const product = useMemo(() => {
if (!productId || allProducts.length === 0) return null;

return (
allProducts.find(p => p.id === productId) ||
allProducts.find(p => productId.includes(p.id)) ||
null
);
}, [allProducts, productId]);

const color = product?.color ?? '';
const capacity = product?.capacity ?? '';
const namespaceId = product?.namespaceId;
const variantId = product?.id;

const [imageIndex, setImageIndex] = useState(0);

const [inCart, setInCart] = useState(false);
const [fav, setFav] = useState(false);

const lastNamespaceIdRef = useRef<string | null>(null);

useEffect(() => {
loadProducts().then(list => {
setAllProducts(list);
});
}, []);

useEffect(() => {
if (!productId) return;

const reset = () => setImageIndex(0);
reset();
}, [productId]);

useEffect(() => {
if (!namespaceId) return;

if (lastNamespaceIdRef.current !== namespaceId) {
window.scrollTo({ top: 0, behavior: 'smooth' });
lastNamespaceIdRef.current = namespaceId;
}
}, [namespaceId]);

useEffect(() => {
if (!variantId) return;

const update = () => {
setInCart(isInCart(variantId, color, capacity));
setFav(isFavorite(variantId, color, capacity));
};

update();
window.addEventListener('storage-update', update);
return () => window.removeEventListener('storage-update', update);
}, [variantId, color, capacity]);

const images = useMemo(() => {
if (!product) return [];

return product.images.map(img => {
const parts = img.split('/');

if (parts.length >= 3) {
parts[parts.length - 2] = color;
}

return resolveImage(parts.join('/'));
});
}, [color, product]);

const recommendations = useMemo(() => {
if (!product) return [];

const shuffle = (items: Product[]) =>
[...items].sort(() => Math.random() - 0.5);

const sameCategory = allProducts.filter(
p => p.id !== product.id && p.category === product.category
);
const otherProducts = allProducts.filter(
p => p.id !== product.id && p.category !== product.category
);

return [
...shuffle(sameCategory),
...shuffle(otherProducts),
].slice(0, 8);
}, [allProducts, product]);

useEffect(() => {
if (!product) return;

document.title = `${product.name} | Phone Catalog`;
}, [product]);

useEffect(() => {
return () => {
document.title = 'Phone Catalog';
};
}, []);

if (!product) return <p>Loading...</p>;

const price = getProductPrice(product, capacity);
const dynamicTitle = product.name;
const categoryTitle =
product.category.charAt(0).toUpperCase() + product.category.slice(1);

return (
<div className="product-page product-page--details" style={{ maxWidth: 1100, margin: '0 auto' }}>
<Breadcrumbs
items={[
{ label: 'Home', to: '/' },
{ label: categoryTitle, to: `/catalog/${product.category}` },
{ label: dynamicTitle },
]}
/>

<Link to={`/catalog/${product.category}`} className="hero-back">
Back
</Link>

<div
className="product-page__content"
style={{
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
marginTop: 20,
}}
>

<div
className="product-page__image"
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
className="product-page__thumbs"
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

<h1
className="product-page__title"
style={{ fontSize: 30, marginBottom: 10, textAlign: 'center' }}
>
{dynamicTitle}
</h1>

<div className="product-page__price" style={{ fontSize: 26, marginBottom: 30 }}>
${price}
</div>

<div className="product-page__colors" style={{ marginBottom: 24, textAlign: 'center' }}>
<div style={{ opacity: 0.6, marginBottom: 10 }}>Color</div>

{product.colorsAvailable.map(c => (
<button
key={c}
onClick={() => {
const next = allProducts.find(
p =>
p.namespaceId === product.namespaceId &&
p.capacity === capacity &&
p.color === c
);

if (next && next.id !== product.id) {
navigate(`/product/${next.id}`, { replace: true });
}

setImageIndex(0);
}}
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

<div className="product-page__capacities" style={{ marginBottom: 30, textAlign: 'center' }}>
<div style={{ opacity: 0.6, marginBottom: 10 }}>Capacity</div>

{product.capacityAvailable.map(c => (
<button
key={c}
onClick={() => {
const next = allProducts.find(
p =>
p.namespaceId === product.namespaceId &&
p.capacity === c &&
p.color === color
);

if (next && next.id !== product.id) {
navigate(`/product/${next.id}`, { replace: true });
}

setImageIndex(0);
}}
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

<div className="product-page__actions" style={{ display: 'flex', gap: 20 }}>
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

{recommendations.length > 0 && (
<section className="you-may-like">
<h2 className="you-may-like__title">You may also like</h2>

<div className="you-may-like__track">
{recommendations.map(item => (
<ProductCard key={item.id} product={item} />
))}
</div>
</section>
)}
</div>
);
};
