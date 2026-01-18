import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import styles from './ProductPage.module.scss';
import button from '../../styles/button.module.scss';
import { Product, ProductDetails } from '../../shared/interfaces/Product';
import { colorMap } from '../../shared/interfaces/colorMap';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Icon } from '../../components/Icon';
import { useFavourites } from '../../context/FavouritesContext';
import { useCart } from '../../context/CartContext';
import rawProducts from '../../../public/api/products.json';
import { ProductsSlider } from '../HomePage/components/ProductsSlider';

export const ProductPage = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const product = products.find(p => p.id === itemId);
  const { cart, addToCart, removeFromCart } = useCart();
  const { toggleFavourite, isFavourite } = useFavourites();

  const category = location.pathname.split('/')[1];
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    const endpoints: Record<string, string> = {
      phones: 'api/phones.json',
      tablets: 'api/tablets.json',
      accessories: 'api/accessories.json',
    };

    fetch(endpoints[category])
      .then(res => res.json())
      .then(setProducts);
  }, [category]);

  const productsData: Product[] = rawProducts.filter(
    (p): p is Product =>
      p.category === 'phones' ||
      p.category === 'tablets' ||
      p.category === 'accessories',
  );

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1 className={styles.title}>Product was not found</h1>

        <Link to="/" className={styles.link}>
          Go to Home page
        </Link>
      </div>
    );
  }

  const shortProduct: Product | null =
    productsData.find(p => p.itemId === product.id) ?? null;

  const isAdded = shortProduct
    ? cart.some(p => p.product.id === shortProduct.id)
    : false;

  const favourite = shortProduct ? isFavourite(shortProduct.id) : false;

  const variants = products.filter(p => p.namespaceId === product.namespaceId);

  const handleColorChange = (color: string) => {
    const target = variants.find(
      v => v.color === color && v.capacity === product.capacity,
    );

    if (target) {
      navigate(`/${category}/${target.id}`);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    const target = variants.find(
      v => v.capacity === capacity && v.color === product.color,
    );

    if (target) {
      navigate(`/${category}/${target.id}`);
    }
  };

  return (
    <div className="container">
      <div className={styles.productDetails}>
        {/* BREADCRUMBS */}
        <Breadcrumbs />

        {/* BACK */}
        <div className={styles.backBtn} onClick={() => navigate(-1)}>
          <div className={styles.backBtn__icon} />
          <p className={styles.backBtn__text}>Back</p>
        </div>

        {/* TITLE */}
        <h1 className={styles.title}>{product.name}</h1>

        {/* TOP */}
        <div className={styles.top}>
          {/* GALLERY */}
          <div className={styles.top__gallery}>
            {/* MAIN IMAGE */}
            <div className={styles.top__gallery__mainImage}>
              <img
                src={activeImage}
                alt={product.name}
                className={styles.mainImageImg}
              />
            </div>

            {/* THUMBNAILS */}
            <div className={styles.top__gallery__thumbnails}>
              {product.images.map(img => {
                const isActive = img === activeImage;

                return (
                  <button
                    key={img}
                    type="button"
                    className={`${styles.top__gallery__thumbnails__thumb} ${
                      isActive
                        ? styles.top__gallery__thumbnails__thumb__active
                        : ''
                    }`}
                    onClick={() => setActiveImage(img)}
                  >
                    <img
                      src={img}
                      alt="thumbnail"
                      className={styles.top__gallery__thumbnails__thumb__image}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* OPTIONS */}
          <div className={styles.top__options}>
            {/* COLORS */}
            <div className={styles.top__options__selector}>
              <div className={styles.label}>Available colors</div>

              <div className={styles.top__options__selector__colorsList}>
                {product.colorsAvailable.map(color => {
                  const inputId = `color-${color}`;

                  return (
                    <div
                      key={color}
                      className={styles.top__options__selector__colorItem}
                    >
                      <label
                        htmlFor={inputId}
                        title={color}
                        className={`${styles.top__options__selector__colorBtn} ${
                          color === product.color
                            ? styles.top__options__selector__colorBtn__active
                            : ''
                        }`}
                        style={{
                          backgroundColor: colorMap[color] ?? '#ccc',
                        }}
                      >
                        <input
                          id={inputId}
                          type="radio"
                          name="color"
                          className={styles.top__options__selector__radioInput}
                          checked={color === product.color}
                          onChange={() => handleColorChange(color)}
                        />
                        {/* <span className="sr-only">{color}</span> */}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CAPACITY */}
            <div className={styles.top__options__selector}>
              <div className={styles.label}>Select capacity</div>

              <div className={styles.top__options__selector__capacityList}>
                {product.capacityAvailable.map(capacity => {
                  const inputId = `capacity-${capacity}`;

                  return (
                    <label
                      key={capacity}
                      htmlFor={inputId}
                      className={`${styles.top__options__selector__capacityList__capacityBtn} ${
                        capacity === product.capacity
                          ? styles.top__options__selector__capacityList__active
                          : ''
                      }`}
                    >
                      <input
                        id={inputId}
                        type="radio"
                        name="capacity"
                        className={
                          styles.top__options__selector__capacityList__raInput
                        }
                        checked={capacity === product.capacity}
                        onChange={() => handleCapacityChange(capacity)}
                      />
                      {capacity}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* PRICE */}
            <div className={styles.top__options__priceBlock}>
              <span className={styles.top__options__priceBlock__priceDiscount}>
                ${product.priceDiscount}
              </span>
              <span className={styles.top__options__priceBlock__priceRegular}>
                ${product.priceRegular}
              </span>
            </div>

            {/* ACTIONS */}
            <div className={styles.top__options__actions}>
              <button
                type="button"
                className={`${button.cartButton} ${
                  isAdded ? button.cartButton__added : ''
                }`}
                onClick={() => {
                  if (!shortProduct) {
                    return;
                  }

                  if (isAdded) {
                    removeFromCart(shortProduct.id);
                  } else {
                    addToCart(shortProduct);
                  }
                }}
              >
                {isAdded ? 'Added' : 'Add to cart'}
              </button>

              <button
                type="button"
                className={button.favouriteButton}
                onClick={() => {
                  if (!shortProduct) {
                    return;
                  }

                  toggleFavourite(shortProduct);
                }}
              >
                <Icon
                  name={favourite ? 'heart-like' : 'heart'}
                  className={button.favouriteIcon}
                />
              </button>
            </div>

            {/* SHORT SPECS */}
            <div className={styles.top__options__specsShort}>
              <div className={styles.top__options__specsShort__specRow}>
                <span className={styles.top__options__specsShort__name}>
                  Screen
                </span>
                <span className={styles.top__options__specsShort__value}>
                  {product.screen}
                </span>
              </div>
              <div className={styles.top__options__specsShort__specRow}>
                <span className={styles.top__options__specsShort__name}>
                  Resolution
                </span>
                <span className={styles.top__options__specsShort__value}>
                  {product.resolution}
                </span>
              </div>
              <div className={styles.top__options__specsShort__specRow}>
                <span className={styles.top__options__specsShort__name}>
                  Processor
                </span>
                <span className={styles.top__options__specsShort__value}>
                  {product.processor}
                </span>
              </div>
              <div className={styles.top__options__specsShort__specRow}>
                <span className={styles.top__options__specsShort__name}>
                  RAM
                </span>
                <span className={styles.top__options__specsShort__value}>
                  {product.ram}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className={styles.bottom}>
          {/* ABOUT */}
          <div className={styles.bottom__about}>
            <h2 className={styles.bottom__about__sectionTitle}>About</h2>

            {product.description.map(section => (
              <div
                key={section.title}
                className={styles.bottom__about__aboutSection}
              >
                <h3 className={styles.bottom__about__aboutSection__aboutTitle}>
                  {section.title}
                </h3>

                <div
                  className={
                    styles.bottom__about__aboutSection__aboutDescription
                  }
                >
                  {section.text.map(text => (
                    <p
                      key={text}
                      className={styles.bottom__about__aboutSection__aboutText}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* TECH SPECS */}
          <div className={styles.bottom__techSpecs}>
            <h2 className={styles.bottom__about__sectionTitle}>Tech specs</h2>

            <div className={styles.bottom__techSpecs__techSpecsList}>
              <div
                className={styles.bottom__techSpecs__techSpecsList__techSpecRow}
              >
                <span className={styles.bottom__techSpecs__techSpecsList__name}>
                  Screen
                </span>
                <span
                  className={styles.bottom__techSpecs__techSpecsList__value}
                >
                  {product.screen}
                </span>
              </div>
              <div
                className={styles.bottom__techSpecs__techSpecsList__techSpecRow}
              >
                <span className={styles.bottom__techSpecs__techSpecsList__name}>
                  Resolution
                </span>
                <span
                  className={styles.bottom__techSpecs__techSpecsList__value}
                >
                  {product.resolution}
                </span>
              </div>
              <div
                className={styles.bottom__techSpecs__techSpecsList__techSpecRow}
              >
                <span className={styles.bottom__techSpecs__techSpecsList__name}>
                  Processor
                </span>
                <span
                  className={styles.bottom__techSpecs__techSpecsList__value}
                >
                  {product.processor}
                </span>
              </div>
              <div
                className={styles.bottom__techSpecs__techSpecsList__techSpecRow}
              >
                <span className={styles.bottom__techSpecs__techSpecsList__name}>
                  RAM
                </span>
                <span
                  className={styles.bottom__techSpecs__techSpecsList__value}
                >
                  {product.ram}
                </span>
              </div>
              <div
                className={styles.bottom__techSpecs__techSpecsList__techSpecRow}
              >
                <span className={styles.bottom__techSpecs__techSpecsList__name}>
                  Built in memory
                </span>
                <span
                  className={styles.bottom__techSpecs__techSpecsList__value}
                >
                  {product.capacity}
                </span>
              </div>
              <div
                className={styles.bottom__techSpecs__techSpecsList__techSpecRow}
              >
                <span className={styles.bottom__techSpecs__techSpecsList__name}>
                  Camera
                </span>
                <span
                  className={styles.bottom__techSpecs__techSpecsList__value}
                >
                  {product.camera}
                </span>
              </div>
              <div
                className={styles.bottom__techSpecs__techSpecsList__techSpecRow}
              >
                <span className={styles.bottom__techSpecs__techSpecsList__name}>
                  Zoom
                </span>
                <span
                  className={styles.bottom__techSpecs__techSpecsList__value}
                >
                  {product.zoom}
                </span>
              </div>
              <div
                className={styles.bottom__techSpecs__techSpecsList__techSpecRow}
              >
                <span className={styles.bottom__techSpecs__techSpecsList__name}>
                  Cell
                </span>
                <span
                  className={styles.bottom__techSpecs__techSpecsList__value}
                >
                  {product.cell.join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.slider}>
          <ProductsSlider type="new" title="You may also like" />
        </div>
      </div>
    </div>
  );
};
