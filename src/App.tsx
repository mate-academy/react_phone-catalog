import { useState } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { products } from './data/products';
import { StoreProvider, useStore } from './context/StoreContext';
import type { Category } from './types';
import './App.scss';

const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

const categoryTitle: Record<Category, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

function Footer() {
  return (
    <footer>
      <a href="https://github.com/" target="_blank" rel="noreferrer">
        GitHub
      </a>
      <button
        className="backToTop"
        onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to top ↑
      </button>
    </footer>
  );
}

const slides = [
  {
    title: 'iPhone 14 Pro',
    subtitle: 'Pro. Beyond.',
    image: asset('/img/Banner slider.png'),
    link: '/phones',
    type: 'reference',
  },
  {
    title: 'iPad Air',
    subtitle: 'Light. Bright. Full of might.',
    image: asset('/img/banner-tablets.png'),
    link: '/tablets',
    type: 'tablet',
  },
  {
    title: 'Apple Watch',
    subtitle: 'A healthy leap ahead.',
    image: asset('/img/banner-accessories.png'),
    link: '/accessories',
    type: 'accessories',
  },
];

function HomeSlider() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const move = (step: number) =>
    setActive(current => (current + step + slides.length) % slides.length);

  return (
    <section className={`slider ${slide.type}`} aria-label="Promotions">
      <button
        className="sliderArrow previous"
        aria-label="Previous slide"
        onClick={() => move(-1)}
      >
        ‹
      </button>
      <Link to={slide.link} className="slide">
        <img src={slide.image} alt={slide.title} />
        {slide.type !== 'reference' && (
          <div className="slideCaption">
            <strong>{slide.title}</strong>
            <span>{slide.subtitle}</span>
            <b>Shop now</b>
          </div>
        )}
      </Link>
      <button
        className="sliderArrow next"
        aria-label="Next slide"
        onClick={() => move(1)}
      >
        ›
      </button>
      <div className="sliderDots">
        {slides.map((item, index) => (
          <button
            key={item.title}
            className={index === active ? 'active' : ''}
            aria-label={`Show slide ${index + 1}`}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  );
}

function Section({
  title,
  products: items,
}: {
  title: string;
  products: typeof products;
}) {
  return (
    <section>
      <h2>{title}</h2>
      <ProductList products={items} />
    </section>
  );
}

function Home() {
  const hot = [...products]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 4);
  const newest = [...products].sort((a, b) => b.year - a.year).slice(0, 4);
  const categoryImages = {
    phones: asset('/img/category-phones.webp'),
    tablets: asset('/img/category-tablets.webp'),
    accessories: asset('/img/category-accessories.webp'),
  };

  return (
    <main>
      <h1 className="visuallyHidden">Product Catalog</h1>
      <HomeSlider />
      <Section title="Hot prices" products={hot} />
      <section className="categories">
        <h2>Shop by category</h2>
        <div>
          {(['phones', 'tablets', 'accessories'] as Category[]).map(c => (
            <Link to={`/${c}`} key={c}>
              <img src={categoryImages[c]} />
              <h3>{categoryTitle[c]}</h3>
              <span>
                {products.filter(p => p.category === c).length} models
              </span>
            </Link>
          ))}
        </div>
      </section>
      <Section title="Brand new models" products={newest} />
    </main>
  );
}

function Listing({ category }: { category: Category }) {
  const loc = useLocation(),
    nav = useNavigate(),
    params = new URLSearchParams(loc.search),
    query = (params.get('query') || '').toLowerCase(),
    sort = params.get('sort') || 'age',
    per = params.get('perPage') || 'all',
    page = Number(params.get('page') || 1);
  const items = products.filter(
    p => p.category === category && p.name.toLowerCase().includes(query),
  );

  items.sort((a, b) =>
    sort === 'title'
      ? a.name.localeCompare(b.name)
      : sort === 'price'
        ? a.price - b.price
        : b.year - a.year,
  );
  const limit = per === 'all' ? items.length : Number(per),
    shown = items.slice((page - 1) * limit, page * limit),
    pages = Math.ceil(items.length / limit);
  const set = (k: string, v: string) => {
    const n = new URLSearchParams(loc.search);

    if (
      !v ||
      (k === 'page' && v === '1') ||
      (k === 'perPage' && v === 'all') ||
      (k === 'sort' && v === 'age')
    ) {
      n.delete(k);
    } else {
      n.set(k, v);
    }

    if (k !== 'page') {
      n.delete('page');
    }

    nav({ search: n.toString() });
  };

  return (
    <main>
      <p className="crumb">
        <Link to="/">Home</Link> / {categoryTitle[category]}
      </p>
      <h1>{categoryTitle[category]}</h1>
      <p className="muted">{items.length} models</p>
      <div className="filters">
        <label>
          Sort by
          <select value={sort} onChange={e => set('sort', e.target.value)}>
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </label>
        <label>
          Items on page
          <select value={per} onChange={e => set('perPage', e.target.value)}>
            {['4', '8', '16', 'all'].map(v => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
      </div>
      {!items.length ? (
        <p className="empty">There are no {category} matching the query</p>
      ) : (
        <ProductList products={shown} />
      )}{' '}
      {pages > 1 && (
        <div className="pagination">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i + 1}
              className={page === i + 1 ? 'active' : ''}
              onClick={() => set('page', String(i + 1))}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </main>
  );
}

function Details() {
  const { productId } = useParams(),
    nav = useNavigate(),
    product = products.find(p => p.id === productId);
  const { addCart, cart, toggleFavorite, favorites } = useStore();
  const [imageIndex, setImageIndex] = useState(0);
  const [color, setColor] = useState(0);
  const [capacity, setCapacity] = useState(0);

  if (!product) {
    return (
      <main>
        <h1>Product was not found</h1>
        <Link to="/">Go home</Link>
      </main>
    );
  }

  const added = cart.some(i => i.product.id === product.id);
  const images = [
    product.image,
    product.image.replace('00.webp', '01.webp'),
    product.image.replace('00.webp', '02.webp'),
  ];
  const specs = [
    ['Screen', product.category === 'tablets' ? "11' IPS" : "6.1' IPS"],
    ['Resolution', '2532x1170'],
    ['Processor', 'Apple A15 Bionic'],
    ['RAM', '4GB'],
    ['Built in memory', product.capacities[capacity]],
    ['Camera', '12 Mp + 12 Mp'],
    ['Zoom', 'Optical, 2x'],
    ['Cell', 'Li-Ion'],
  ];

  return (
    <main className="productPage">
      <button className="back" onClick={() => nav(-1)}>
        ← Back
      </button>
      <p className="crumb">
        <Link to="/">Home</Link> /{' '}
        <Link to={`/${product.category}`}>
          {categoryTitle[product.category]}
        </Link>{' '}
        / {product.name}
      </p>
      <h1>{product.name}</h1>
      <div className="details">
        <div className="gallery">
          <div className="thumbs">
            {images.map((src, i) => (
              <button
                key={src}
                className={imageIndex === i ? 'selected' : ''}
                onClick={() => setImageIndex(i)}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
          <img
            className="mainImage"
            src={images[imageIndex]}
            alt={product.name}
          />
        </div>
        <div className="purchase">
          <div className="optionHead">
            <span>Available colors</span>
            <small>ID: {product.id}</small>
          </div>
          <div className="swatches">
            {product.colors.map((item, i) => (
              <button
                aria-label={`Color ${i + 1}`}
                key={item}
                className={color === i ? 'chosen' : ''}
                onClick={() => setColor(i)}
              >
                <i style={{ background: item }} />
              </button>
            ))}
          </div>
          <div className="capacityLabel">Select capacity</div>
          <div className="capacities">
            {product.capacities.map((item, i) => (
              <button
                key={item}
                className={capacity === i ? 'active' : ''}
                onClick={() => setCapacity(i)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="priceRow">
            <p className="price">${product.price}</p>
            <del>${product.fullPrice}</del>
          </div>
          <div className="buyActions">
            <button
              className={added ? 'added' : ''}
              onClick={() => addCart(product)}
            >
              {added ? 'Added to cart' : 'Add to cart'}
            </button>
            <button
              className="favorite"
              aria-label="Add to favorites"
              onClick={() => toggleFavorite(product.id)}
            >
              {favorites.includes(product.id) ? '♥' : '♡'}
            </button>
          </div>
        </div>
      </div>
      <section className="info">
        <article className="about">
          <h2>About</h2>
          <h3>{product.description}</h3>
          <p>
            Designed for everyday use with premium materials and dependable
            performance. Choose the configuration that fits your style and stay
            connected all day.
          </p>
          <h3>Beautiful. Durable. Essential.</h3>
          <p>
            The vivid display and advanced camera system make every moment look
            extraordinary.
          </p>
        </article>
        <article className="tech">
          <h2>Tech specs</h2>
          <dl>
            {specs.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </article>
      </section>
      <Section
        title="You may also like"
        products={products.filter(item => item.id !== product.id).slice(0, 4)}
      />
    </main>
  );
}

function Cart() {
  const { cart, changeQty, removeCart, clearCart } = useStore();
  const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <main>
      <button className="back" onClick={() => history.back()}>
        ← Back
      </button>
      <h1>Cart</h1>
      {!cart.length ? (
        <p className="empty">Your cart is empty</p>
      ) : (
        <>
          <div className="cart">
            {cart.map(({ product, quantity }) => (
              <div key={product.id}>
                <img src={product.image} />
                <Link to={`/product/${product.id}`}>{product.name}</Link>
                <div className="qty">
                  <button onClick={() => changeQty(product.id, quantity - 1)}>
                    −
                  </button>
                  {quantity}
                  <button onClick={() => changeQty(product.id, quantity + 1)}>
                    +
                  </button>
                </div>
                <b>${product.price * quantity}</b>
                <button
                  className="remove"
                  onClick={() => removeCart(product.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <aside className="checkout">
            <h2>${total}</h2>
            <p>Total for {cart.reduce((s, i) => s + i.quantity, 0)} items</p>
            <button
              className="primary"
              onClick={() => {
                if (
                  confirm(
                    'Checkout is not implemented yet. Do you want to clear ' +
                      'the Cart?',
                  )
                ) {
                  clearCart();
                }
              }}
            >
              Checkout
            </button>
          </aside>
        </>
      )}
    </main>
  );
}

function Favorites() {
  const { favorites } = useStore();
  const fav = products.filter(p => favorites.includes(p.id));

  return (
    <main>
      <h1>Favorites</h1>
      <p className="muted">{fav.length} items</p>
      {fav.length ? (
        <ProductList products={fav} />
      ) : (
        <p className="empty">There are no favorite products yet</p>
      )}
    </main>
  );
}

function NotFound() {
  return (
    <main>
      <h1>Page not found</h1>
      <Link to="/">Back to Home page</Link>
    </main>
  );
}

export const App = () => (
  <StoreProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/phones" element={<Listing category="phones" />} />
        <Route path="/tablets" element={<Listing category="tablets" />} />
        <Route
          path="/accessories"
          element={<Listing category="accessories" />}
        />
        <Route path="/product/:productId" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StoreProvider>
);
