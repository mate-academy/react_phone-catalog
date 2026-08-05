import React, { useEffect, useMemo, useState } from 'react';
import {
  HashRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import './App.scss';

type Category = 'phones' | 'tablets' | 'accessories';

type Product = {
  id: number;
  category: Category;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

type ProductDetails = {
  id: string;
  category: Category;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: { title: string; text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};

type CartItem = { product: Product; quantity: number };

const getStored = <T,>(key: string, fallback: T): T => {
  try {
    return JSON.parse(localStorage.getItem(key) || '') as T;
  } catch {
    return fallback;
  }
};

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const load = () => {
    setIsLoading(true);
    setHasError(false);
    fetch('api/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(load, []);

  return { products, isLoading, hasError, reload: load };
};

const StoreContext = React.createContext<{
  products: Product[];
  isLoading: boolean;
  hasError: boolean;
  reload: () => void;
  favorites: number[];
  toggleFavorite: (product: Product) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  changeQuantity: (id: number, value: number) => void;
  clearCart: () => void;
} | null>(null);

const useStore = () => {
  const value = React.useContext(StoreContext);

  if (!value) {
    throw new Error('Store is not available');
  }

  return value;
};

const Logo = () => (
  <Link to="/" className="logo" aria-label="Nice gadgets home">
    NICE<span>GADGETS</span>
  </Link>
);

const Header = () => {
  const { favorites, cart } = useStore();
  const totalCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <Logo />
      <nav className="nav">
        {[
          ['/', 'Home'],
          ['/phones', 'Phones'],
          ['/tablets', 'Tablets'],
          ['/accessories', 'Accessories'],
        ].map(([to, label]) => (
          <NavLink key={to} to={to} className="nav__link">
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="header__actions">
        <NavLink to="/favorites" className="icon-link" aria-label="Favorites">
          ♡{favorites.length > 0 && <b>{favorites.length}</b>}
        </NavLink>
        <NavLink to="/cart" className="icon-link" aria-label="Cart">
          ◫{totalCart > 0 && <b>{totalCart}</b>}
        </NavLink>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="footer">
    <Logo />
    <a href="https://github.com/luanstipp2018-arch/react_phone-catalog">
      Github
    </a>
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      Back to top ↑
    </button>
  </footer>
);

const Loader = () => <div className="loader" aria-label="Loading" />;

const ProductCard = ({ product }: { product: Product }) => {
  const { favorites, toggleFavorite, cart, addToCart } = useStore();
  const isFavorite = favorites.includes(product.id);
  const isAdded = cart.some(item => item.product.id === product.id);

  return (
    <article className="product-card">
      <Link to={`/product/${product.itemId}`} className="product-card__image">
        <img src={product.image} alt={product.name} />
      </Link>
      <Link to={`/product/${product.itemId}`} className="product-card__title">
        {product.name}
      </Link>
      <div className="price">
        <strong>${product.price}</strong>
        {product.fullPrice !== product.price && <del>${product.fullPrice}</del>}
      </div>
      <dl className="specs">
        <div>
          <dt>Screen</dt>
          <dd>{product.screen}</dd>
        </div>
        <div>
          <dt>Capacity</dt>
          <dd>{product.capacity}</dd>
        </div>
        <div>
          <dt>RAM</dt>
          <dd>{product.ram}</dd>
        </div>
      </dl>
      <div className="product-card__buttons">
        <button
          type="button"
          className={classNames('primary-button', { added: isAdded })}
          onClick={() => addToCart(product)}
        >
          {isAdded ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          className={classNames('heart-button', { active: isFavorite })}
          onClick={() => toggleFavorite(product)}
          aria-label="Toggle favorite"
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>
    </article>
  );
};

const ProductSlider = ({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) => {
  const [start, setStart] = useState(0);
  const visible = [...products.slice(start), ...products.slice(0, start)].slice(
    0,
    4,
  );

  return (
    <section className="home-section">
      <div className="section-title">
        <h2>{title}</h2>
        <div>
          <button
            type="button"
            onClick={() =>
              setStart((start - 1 + products.length) % products.length)
            }
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setStart((start + 1) % products.length)}
          >
            ›
          </button>
        </div>
      </div>
      <div className="products-grid slider-grid">
        {visible.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

const HomePage = () => {
  const { products, isLoading } = useStore();
  const [slide, setSlide] = useState(0);
  const banners = [
    'img/banner-phones.png',
    'img/banner-tablets.png',
    'img/banner-accessories.png',
  ];

  useEffect(() => {
    const timer = window.setInterval(
      () => setSlide(value => (value + 1) % banners.length),
      5000,
    );

    return () => window.clearInterval(timer);
  }, [banners.length]);

  if (isLoading) {
    return <Loader />;
  }

  const hot = [...products].sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );
  const newest = [...products].sort((a, b) => b.year - a.year);

  return (
    <main>
      <h1 className="visually-hidden">Product Catalog</h1>
      <section className="hero">
        <button
          type="button"
          onClick={() =>
            setSlide((slide - 1 + banners.length) % banners.length)
          }
        >
          ‹
        </button>
        <img src={banners[slide]} alt="Featured gadgets" />
        <button
          type="button"
          onClick={() => setSlide((slide + 1) % banners.length)}
        >
          ›
        </button>
      </section>
      <div className="dots">
        {banners.map((banner, index) => (
          <button
            key={banner}
            type="button"
            className={classNames({ active: slide === index })}
            onClick={() => setSlide(index)}
          />
        ))}
      </div>
      <ProductSlider title="Hot prices" products={hot} />
      <section className="home-section">
        <h2>Shop by category</h2>
        <div className="categories">
          {(
            [
              ['phones', 'Mobile phones', 'img/category-phones.png'],
              ['tablets', 'Tablets', 'img/category-tablets.png'],
              ['accessories', 'Accessories', 'img/category-accessories.png'],
            ] as const
          ).map(([category, title, image]) => {
            const count = products.filter(
              item => item.category === category,
            ).length;

            return (
              <Link
                to={`/${category}`}
                key={category}
                className={`category category--${category}`}
              >
                <img src={image} alt="" />
                <h3>{title}</h3>
                <p>{count} models</p>
              </Link>
            );
          })}
        </div>
      </section>
      <ProductSlider title="Brand new models" products={newest} />
    </main>
  );
};

const CatalogPage = ({ category }: { category: Category }) => {
  const { products, isLoading, hasError, reload } = useStore();
  const [params, setParams] = useSearchParams();
  const sort = params.get('sort') || 'age';
  const query = params.get('query') || '';
  const perPage = params.get('perPage') || 'all';
  const page = Number(params.get('page') || 1);
  const title = category[0].toUpperCase() + category.slice(1);

  const update = (key: string, value: string, defaultValue?: string) => {
    const next = new URLSearchParams(params);

    if (!value || value === defaultValue) {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    if (key !== 'page') {
      next.delete('page');
    }

    setParams(next);
  };

  const filtered = useMemo(() => {
    const result = products
      .filter(product => product.category === category)
      .filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      );

    return [...result].sort((a, b) => {
      if (sort === 'title') {
        return a.name.localeCompare(b.name);
      }

      if (sort === 'price') {
        return a.price - b.price;
      }

      return b.year - a.year;
    });
  }, [products, category, query, sort]);

  const limit = perPage === 'all' ? filtered.length : Number(perPage);
  const pageCount = Math.ceil(filtered.length / Math.max(limit, 1));
  const visible = filtered.slice((page - 1) * limit, page * limit);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div className="message">
        <h1>Something went wrong</h1>
        <button type="button" onClick={reload}>
          Reload
        </button>
      </div>
    );
  }

  return (
    <main>
      <div className="breadcrumbs">
        <Link to="/">Home</Link> / {title}
      </div>
      <h1>{title} page</h1>
      <p className="muted">{filtered.length} models</p>
      <div className="catalog-controls">
        <label>
          Search
          <input
            type="search"
            value={query}
            onChange={event => update('query', event.target.value)}
            placeholder={`Search in ${category}`}
          />
        </label>
        <label>
          Sort by
          <select
            value={sort}
            onChange={event => update('sort', event.target.value, 'age')}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </label>
        <label>
          Items on page
          <select
            value={perPage}
            onChange={event => update('perPage', event.target.value, 'all')}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </label>
      </div>
      {visible.length ? (
        <div className="products-grid">
          {visible.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="message">
          {query
            ? `There are no ${category} matching the query`
            : `There are no ${category} yet`}
        </div>
      )}
      {pageCount > 1 && (
        <div className="pagination">
          {Array.from({ length: pageCount }, (_, index) => index + 1).map(
            number => (
              <button
                type="button"
                className={classNames({ active: number === page })}
                key={number}
                onClick={() => update('page', String(number), '1')}
              >
                {number}
              </button>
            ),
          )}
        </div>
      )}
    </main>
  );
};

const DetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, cart, favorites, toggleFavorite } = useStore();
  const [details, setDetails] = useState<ProductDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const category =
      products.find(item => item.itemId === productId)?.category || 'phones';

    fetch(`api/${category}.json`)
      .then(response => response.json())
      .then(setDetails)
      .finally(() => setIsLoading(false));
  }, [productId, products]);

  if (isLoading) {
    return <Loader />;
  }

  const detail = details.find(item => item.id === productId);
  const product = products.find(item => item.itemId === productId);

  if (!detail || !product) {
    return (
      <div className="message">
        <h1>Product was not found</h1>
        <img src="img/product-not-found.png" alt="Product not found" />
      </div>
    );
  }

  const variant = (color: string, capacity: string) =>
    details.find(
      item =>
        item.namespaceId === detail.namespaceId &&
        item.color === color &&
        item.capacity === capacity,
    )?.id;

  return (
    <main>
      <div className="breadcrumbs">
        <Link to="/">Home</Link> /{' '}
        <Link to={`/${detail.category}`}>{detail.category}</Link> /{' '}
        {detail.name}
      </div>
      <button className="back" type="button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1>{detail.name}</h1>
      <section className="details-top">
        <div className="gallery">
          <div className="thumbnails">
            {detail.images.map((image, index) => (
              <button
                type="button"
                key={image}
                className={classNames({ active: selectedImage === index })}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
          <img
            className="main-image"
            src={detail.images[selectedImage]}
            alt={detail.name}
          />
        </div>
        <div className="details-buy">
          <p className="muted">Available colors</p>
          <div className="options colors">
            {detail.colorsAvailable.map(color => (
              <button
                type="button"
                aria-label={color}
                style={{ backgroundColor: color }}
                className={classNames({ active: color === detail.color })}
                key={color}
                onClick={() =>
                  variant(color, detail.capacity) &&
                  navigate(`/product/${variant(color, detail.capacity)}`)
                }
              />
            ))}
          </div>
          <hr />
          <p className="muted">Select capacity</p>
          <div className="options">
            {detail.capacityAvailable.map(capacity => (
              <button
                type="button"
                className={classNames({ active: capacity === detail.capacity })}
                key={capacity}
                onClick={() =>
                  variant(detail.color, capacity) &&
                  navigate(`/product/${variant(detail.color, capacity)}`)
                }
              >
                {capacity}
              </button>
            ))}
          </div>
          <div className="price details-price">
            <strong>${detail.priceDiscount}</strong>
            <del>${detail.priceRegular}</del>
          </div>
          <div className="product-card__buttons">
            <button
              type="button"
              className={classNames('primary-button', {
                added: cart.some(item => item.product.id === product.id),
              })}
              onClick={() => addToCart(product)}
            >
              {cart.some(item => item.product.id === product.id)
                ? 'Added to cart'
                : 'Add to cart'}
            </button>
            <button
              type="button"
              className={classNames('heart-button', {
                active: favorites.includes(product.id),
              })}
              onClick={() => toggleFavorite(product)}
            >
              {favorites.includes(product.id) ? '♥' : '♡'}
            </button>
          </div>
          <dl className="specs">
            <div>
              <dt>Screen</dt>
              <dd>{detail.screen}</dd>
            </div>
            <div>
              <dt>Resolution</dt>
              <dd>{detail.resolution}</dd>
            </div>
            <div>
              <dt>Processor</dt>
              <dd>{detail.processor}</dd>
            </div>
            <div>
              <dt>RAM</dt>
              <dd>{detail.ram}</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="details-info">
        <div>
          <h2>About</h2>
          {detail.description.map(section => (
            <article key={section.title}>
              <h3>{section.title}</h3>
              {section.text.map(text => (
                <p key={text}>{text}</p>
              ))}
            </article>
          ))}
        </div>
        <div>
          <h2>Tech specs</h2>
          <dl className="specs">
            <div>
              <dt>Screen</dt>
              <dd>{detail.screen}</dd>
            </div>
            <div>
              <dt>Resolution</dt>
              <dd>{detail.resolution}</dd>
            </div>
            <div>
              <dt>Processor</dt>
              <dd>{detail.processor}</dd>
            </div>
            <div>
              <dt>RAM</dt>
              <dd>{detail.ram}</dd>
            </div>
            <div>
              <dt>Camera</dt>
              <dd>{detail.camera}</dd>
            </div>
            <div>
              <dt>Zoom</dt>
              <dd>{detail.zoom}</dd>
            </div>
          </dl>
        </div>
      </section>
      <ProductSlider
        title="You may also like"
        products={products.filter(item => item.id !== product.id).slice(0, 8)}
      />
    </main>
  );
};

const FavoritesPage = () => {
  const { products, favorites } = useStore();
  const items = products.filter(product => favorites.includes(product.id));

  return (
    <main>
      <h1>Favorites</h1>
      <p className="muted">{items.length} items</p>
      {items.length ? (
        <div className="products-grid">
          {items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="message">Your favorites are empty</div>
      )}
    </main>
  );
};

const CartPage = () => {
  const { cart, removeFromCart, changeQuantity, clearCart } = useStore();
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const checkout = () => {
    if (
      window.confirm(
        'Checkout is not implemented yet. Do you want to clear the Cart?',
      )
    ) {
      clearCart();
    }
  };

  return (
    <main>
      <button className="back" type="button" onClick={() => history.back()}>
        ← Back
      </button>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <img src="img/cart-is-empty.png" alt="Empty cart" />
          <h2>Your cart is empty</h2>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            {cart.map(item => (
              <article className="cart-item" key={item.product.id}>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  ×
                </button>
                <img src={item.product.image} alt="" />
                <Link to={`/product/${item.product.itemId}`}>
                  {item.product.name}
                </Link>
                <div className="counter">
                  <button
                    type="button"
                    disabled={item.quantity === 1}
                    onClick={() =>
                      changeQuantity(item.product.id, item.quantity - 1)
                    }
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() =>
                      changeQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <strong>${item.product.price * item.quantity}</strong>
              </article>
            ))}
          </div>
          <aside className="checkout">
            <strong>${total}</strong>
            <p>Total for {quantity} items</p>
            <hr />
            <button type="button" className="primary-button" onClick={checkout}>
              Checkout
            </button>
          </aside>
        </div>
      )}
    </main>
  );
};

const NotFoundPage = () => (
  <main className="message">
    <h1>Page not found</h1>
    <img src="img/page-not-found.png" alt="Page not found" />
    <Link className="primary-button" to="/">
      Go home
    </Link>
  </main>
);

const Store = () => {
  const productState = useProducts();
  const [favorites, setFavorites] = useState<number[]>(() =>
    getStored('favorites', []),
  );
  const [cart, setCart] = useState<CartItem[]>(() => getStored('cart', []));

  useEffect(
    () => localStorage.setItem('favorites', JSON.stringify(favorites)),
    [favorites],
  );
  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
  const value = {
    ...productState,
    favorites,
    cart,
    toggleFavorite: (product: Product) =>
      setFavorites(items =>
        items.includes(product.id)
          ? items.filter(id => id !== product.id)
          : [...items, product.id],
      ),
    addToCart: (product: Product) =>
      setCart(items =>
        items.some(item => item.product.id === product.id)
          ? items
          : [...items, { product, quantity: 1 }],
      ),
    removeFromCart: (id: number) =>
      setCart(items => items.filter(item => item.product.id !== id)),
    changeQuantity: (id: number, quantity: number) =>
      setCart(items =>
        items.map(item =>
          item.product.id === id ? { ...item, quantity } : item,
        ),
      ),
    clearCart: () => setCart([]),
  };

  return (
    <StoreContext.Provider value={value}>
      <Header />
      <div className="page">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<CatalogPage category="phones" />} />
          <Route path="/tablets" element={<CatalogPage category="tablets" />} />
          <Route
            path="/accessories"
            element={<CatalogPage category="accessories" />}
          />
          <Route path="/product/:productId" element={<DetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </StoreContext.Provider>
  );
};

export const App = () => (
  <HashRouter>
    <Store />
  </HashRouter>
);
