import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../shared/types/Product';
import { ProductDetails } from '../shared/types/ProductDetails';
import {
  getProductByItemId,
  getProductDetails,
  getSuggestedProducts,
} from '../shared/api/getProducts';
import { categories } from '../shared/constants/categories';
import { productColors } from '../shared/constants/colors';
import { useCart } from '../shared/context/CartContext';
import { useFavorites } from '../shared/context/FavoritesContext';
import { Loader } from '../shared/components/Loader';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { BackButton } from '../shared/components/BackButton';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import favouritesIcon from '../shared/assets/icons/favourites.svg';
import favouritesFilledIcon from '../shared/assets/icons/favourites-filled.svg';
import styles from './ProductDetailsPage.module.scss';

// id варианта собирается из частей: apple-iphone-11 + 128gb + black
const getVariantId = (namespaceId: string, capacity: string, color: string) =>
  `${namespaceId}-${capacity.toLowerCase()}-${color.replace(/ /g, '-')}`;

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [product, setProduct] = useState<Product | null>(null);
  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // переход на другой товар (например, из "You may also like") — плавно
  // наверх; при смене цвета/памяти того же товара скролл не трогаем
  const keepScroll = Boolean(location.state?.keepScroll);

  useEffect(() => {
    if (!keepScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [productId, keepScroll]);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setSelectedImage(0);

    // сначала короткая карточка (даёт категорию), потом подробности из файла категории
    getProductByItemId(productId)
      .then(found => {
        setProduct(found);

        return found ? getProductDetails(found.category, productId) : null;
      })
      .then(setDetails)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));

    getSuggestedProducts(8).then(setSuggested);
  }, [productId]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Loader />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={styles.page}>
        <p className={styles.message}>Something went wrong</p>
      </div>
    );
  }

  if (!product || !details) {
    return (
      <div className={styles.page}>
        <div className={styles.breadcrumbs}>
          <Breadcrumbs items={[{ text: productId }]} />
        </div>
        <BackButton />
        <p className={styles.message}>Product was not found</p>
        <img
          src="./img/product-not-found.png"
          alt=""
          className={styles.notFoundImage}
        />
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const favorite = isFavorite(product.id);
  const category = categories[details.category];

  const goToVariant = (capacity: string, color: string) => {
    navigate(`/product/${getVariantId(details.namespaceId, capacity, color)}`, {
      state: { keepScroll: true },
    });
  };

  const techSpecs = [
    ['Screen', details.screen],
    ['Resolution', details.resolution],
    ['Processor', details.processor],
    ['RAM', details.ram],
    ['Built in memory', details.capacity],
    ['Camera', details.camera],
    ['Zoom', details.zoom],
    ['Cell', details.cell.join(', ')],
  ].filter(([, value]) => value); // у аксессуаров нет камеры и зума

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs
          items={[
            { text: category.breadcrumb, to: `/${details.category}` },
            { text: details.name },
          ]}
        />
      </div>

      <div className={styles.back}>
        <BackButton to={`/${details.category}`} />
      </div>

      <h1 className={styles.title}>{details.name}</h1>

      <div className={styles.top}>
        {/* галерея: миниатюры слева, выбранная картинка справа */}
        <div className={styles.gallery}>
          <div className={styles.thumbs}>
            {details.images.map((image, index) => (
              <button
                type="button"
                key={image}
                className={classNames(styles.thumb, {
                  [styles.thumbActive]: index === selectedImage,
                })}
                onClick={() => setSelectedImage(index)}
                aria-label={`Show image ${index + 1}`}
              >
                <img src={`./${image}`} alt="" />
              </button>
            ))}
          </div>

          <div className={styles.mainImage}>
            <img
              src={`./${details.images[selectedImage]}`}
              alt={details.name}
            />
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.option}>
            <div className={styles.optionHeader}>
              <span className={styles.optionLabel}>Available colors</span>
              <span className={styles.productId}>ID: {product.id}</span>
            </div>

            <div className={styles.colors}>
              {details.colorsAvailable.map(color => (
                <label
                  key={color}
                  className={classNames(styles.color, {
                    [styles.colorActive]: color === details.color,
                  })}
                  title={color}
                >
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    checked={color === details.color}
                    onChange={() => goToVariant(details.capacity, color)}
                    className={styles.radio}
                  />
                  <span
                    className={styles.colorDot}
                    style={{ backgroundColor: productColors[color] ?? color }}
                  />
                  {/* текст для скринридера и правила a11y: у кружка нет надписи */}
                  <span className={styles.visuallyHidden}>{color}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.option}>
            <span className={styles.optionLabel}>Select capacity</span>

            <div className={styles.capacities}>
              {details.capacityAvailable.map(capacity => (
                <label
                  key={capacity}
                  className={classNames(styles.capacity, {
                    [styles.capacityActive]: capacity === details.capacity,
                  })}
                >
                  <input
                    type="radio"
                    name="capacity"
                    value={capacity}
                    checked={capacity === details.capacity}
                    onChange={() => goToVariant(capacity, details.color)}
                    className={styles.radio}
                  />
                  {capacity}
                </label>
              ))}
            </div>
          </div>

          <p className={styles.price}>
            ${details.priceDiscount}
            <span className={styles.fullPrice}>${details.priceRegular}</span>
          </p>

          <div className={styles.actions}>
            <button
              type="button"
              className={classNames(styles.addToCart, {
                [styles.addToCartAdded]: inCart,
              })}
              onClick={() => addToCart(product)}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              className={styles.favorite}
              aria-label={
                favorite ? 'Remove from favorites' : 'Add to favorites'
              }
              aria-pressed={favorite}
              onClick={() => toggleFavorite(product)}
            >
              <img
                src={favorite ? favouritesFilledIcon : favouritesIcon}
                alt=""
              />
            </button>
          </div>

          <dl className={styles.shortSpecs}>
            {techSpecs.slice(0, 4).map(([label, value]) => (
              <div key={label} className={styles.shortSpec}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className={styles.bottom}>
        <section className={styles.about}>
          <h2 className={styles.sectionTitle}>About</h2>

          {details.description.map(section => (
            <article key={section.title} className={styles.aboutSection}>
              <h3 className={styles.aboutTitle}>{section.title}</h3>
              {section.text.map(paragraph => (
                <p key={paragraph} className={styles.aboutText}>
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </section>

        <section className={styles.specs}>
          <h2 className={styles.sectionTitle}>Tech specs</h2>

          <dl className={styles.specsList}>
            {techSpecs.map(([label, value]) => (
              <div key={label} className={styles.specsRow}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {suggested.length > 0 && (
        <ProductsSlider
          title="You may also like"
          products={suggested}
          showFullPrice
        />
      )}
    </div>
  );
};
