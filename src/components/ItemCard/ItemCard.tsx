import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Product, ProductItem } from '../../types/product';
import { getProducts } from '../../api/getProducts';
import { ProductsSlider } from '../ProductsSlider';
import { useCart, useFavorites } from '../../ItemsProvider';
import { useNavigate } from 'react-router-dom';

import styles from './ItemCard.module.scss';
import catalogStyles from '../../Pages/Catalog/Catalog.module.scss';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';

const colorMap: Record<string, string> = {
  black: '#212122',
  white: '#F0F0F0',
  green: '#E2E9E1',
  yellow: '#FFE681',
  purple: '#D1CDDA',
  red: '#BA0C2E',
  spacegray: '#535150',
  silver: '#E2E4E1',
  gold: '#F9E5C9',
  midnight: '#191970',
};

export const ItemCard = () => {
  const navigate = useNavigate();
  const { category, product } = useParams<{
    category: string;
    product: string;
  }>();

  const [currentProduct, setCurrentProduct] = useState<ProductItem | null>(
    null,
  );
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [currentImage, setCurrentImage] = useState(0);

  const [, setRetry] = useState(0);

  const handleRetry = () => {
    setRetry(prev => prev + 1);
  };

  const getNewModelPath = (newCapacity?: string, newColor?: string) => {
    if (!currentProduct) {
      return '';
    }

    const capacity = newCapacity || currentProduct.capacity;
    const color = newColor || currentProduct.color;

    return `/catalog/${category}/${currentProduct.namespaceId}-${capacity.toLowerCase()}-${color.replace(/\s+/g, '-')}`;
  };

  const productSummary = useMemo(() => {
    if (!currentProduct) {
      return null;
    }

    return similarProducts.find(p => p.itemId === currentProduct.id) || null;
  }, [similarProducts, currentProduct]);

  const { cartItems, setCartItems } = useCart();
  const { favoritesItems, setFavoritesItems } = useFavorites();

  const isFavorite = useMemo(() => {
    return favoritesItems.some(item => item.itemId === product);
  }, [favoritesItems, product]);

  const isCart = useMemo(() => {
    return cartItems.some(item => item.product.itemId === product);
  }, [cartItems, product]);

  const addToCart = () => {
    if (!productSummary) {
      return;
    }

    setCartItems(prev => {
      const exists = prev.some(item => item.product.id === productSummary.id);

      return exists
        ? prev.filter(item => item.product.id !== productSummary.id)
        : [...prev, { product: productSummary, quantity: 1 }];
    });
  };

  const addToFavorites = () => {
    if (!productSummary) {
      return;
    }

    setFavoritesItems(prev => {
      const exists = prev.some(prod => prod.itemId === productSummary.itemId);

      return exists
        ? prev.filter(prod => prod.itemId !== productSummary.itemId)
        : [...prev, productSummary];
    });
  };

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      setIsError(false);

      let currentURL = '';

      switch (category) {
        case 'phones':
          currentURL = '/api/phones.json';
          break;
        case 'tablets':
          currentURL = '/api/tablets.json';
          break;
        case 'accessories':
          currentURL = '/api/accessories.json';
          break;
        default:
          setIsError(true);
          setIsLoading(false);

          return;
      }

      try {
        const data = await getProducts<ProductItem[]>(currentURL);
        const simProductsResponse = await getProducts<Product[]>();
        const foundProduct = data.find(item => item.id === product);

        if (foundProduct) {
          setCurrentProduct(foundProduct);
          setCurrentImage(0);
        } else {
          setIsError(true);
        }

        setSimilarProducts(
          simProductsResponse.filter(prod => prod.category === category),
        );
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (product && category) {
      loadProduct();
    }
  }, [category, product]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !currentProduct) {
    return (
      <ErrorMessage onRetry={handleRetry} message="Product was not found" />
    );
  }

  return (
    <section className={styles.cartItem}>
      <nav className={catalogStyles.catalog__nav}>
        <Link to="/" className={catalogStyles['catalog__home-icon']} />
        <div className={catalogStyles.catalog__arrow} />
        <Link
          to={`/${category}`}
          className={classNames(
            catalogStyles['catalog__current-page'],
            catalogStyles['catalog__current-page-category'],
          )}
        >
          {category}
        </Link>
        <div className={catalogStyles.catalog__arrow} />
        <span className={catalogStyles['catalog__current-page']}>
          {currentProduct.name}
        </span>
      </nav>

      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles['button-back']}
      >
        <img src="/img/icons/Arrow_Left.png" alt="Back" />
        <p className={styles.button__title}>Back</p>
      </button>

      <h1 className={styles.cartItem__title}>{currentProduct.name}</h1>

      <div className={styles.cartItem__content}>
        <article className={styles.cartItem__images}>
          {currentProduct.images.map((img, index) => (
            <img
              key={index}
              src={`/${img}`}
              alt="preview"
              className={styles.cartItem__preview}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </article>

        <img
          src={`/${currentProduct.images[currentImage]}`}
          alt={currentProduct.name}
          className={styles.cartItem__photo}
        />

        <article className={styles.cartItem__select}>
          <p className={styles.cartItem__select_title}>Available colors</p>
          <div className={styles['colors-list']}>
            {currentProduct.colorsAvailable.map(color => (
              <NavLink
                key={color}
                to={getNewModelPath(undefined, color)}
                className={() =>
                  classNames(styles['color-button'], {
                    [styles['color-button--active']]:
                      color === currentProduct.color,
                  })
                }
                title={color}
              >
                <div
                  className={styles['color-button__internal']}
                  style={{
                    backgroundColor: colorMap[color.replace(' ', '')] || color,
                  }}
                />
              </NavLink>
            ))}
          </div>

          <div className={styles.cartItem__line} />

          <p className={styles.cartItem__select_title}>Select capacity</p>
          <div className={styles['capacity-list']}>
            {currentProduct.capacityAvailable.map(cap => (
              <NavLink
                key={cap}
                to={getNewModelPath(cap, undefined)}
                className={() =>
                  classNames(styles['capacity-button'], {
                    [styles['capacity-button--active']]:
                      cap === currentProduct.capacity,
                  })
                }
              >
                {cap}
              </NavLink>
            ))}
          </div>

          <div className={styles.cartItem__line} />

          <div className={styles.cartItem__buttons}>
            <button
              className={classNames(styles.buttonCard, {
                [styles['buttonCard--selected']]: isCart,
              })}
              onClick={addToCart}
            >
              Add to cart
            </button>
            <button
              className={classNames(styles.buttonFavorites, {
                [styles['buttonFavorites--selected']]: isFavorite,
              })}
              onClick={addToFavorites}
            />
          </div>

          <table className={styles.cartItem__table}>
            <tbody className={styles.cartItem__info}>
              <tr className={styles.cartItem__info_row}>
                <td
                  className={classNames(
                    styles.cartItem__info_cell,
                    styles.cartItem__info_cell_title,
                  )}
                >
                  Screen
                </td>
                <td
                  className={classNames(
                    styles.cartItem__info_cell,
                    styles.cartItem__info_cell_value,
                  )}
                >
                  {currentProduct.screen}
                </td>
              </tr>
              <tr className={styles.cartItem__info_row}>
                <td
                  className={classNames(
                    styles.cartItem__info_cell,
                    styles.cartItem__info_cell_title,
                  )}
                >
                  Resolution
                </td>
                <td
                  className={classNames(
                    styles.cartItem__info_cell,
                    styles.cartItem__info_cell_value,
                  )}
                >
                  {currentProduct.resolution}
                </td>
              </tr>
              <tr className={styles.cartItem__info_row}>
                <td
                  className={classNames(
                    styles.cartItem__info_cell,
                    styles.cartItem__info_cell_title,
                  )}
                >
                  Processor
                </td>
                <td
                  className={classNames(
                    styles.cartItem__info_cell,
                    styles.cartItem__info_cell_value,
                  )}
                >
                  {currentProduct.processor}
                </td>
              </tr>
              <tr className={styles.cartItem__info_row}>
                <td
                  className={classNames(
                    styles.cartItem__info_cell,
                    styles.cartItem__info_cell_title,
                  )}
                >
                  RAM
                </td>
                <td
                  className={classNames(
                    styles.cartItem__info_cell,
                    styles.cartItem__info_cell_value,
                  )}
                >
                  {currentProduct.ram}
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>

      <article className={styles.description}>
        <h2>About</h2>
        {currentProduct.description.map((item, index) => (
          <div key={index}>
            <h3>{item.title}</h3>
            {item.text.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        ))}
      </article>

      <article className={styles.techSpecs}>
        <p className={styles.techSpecs__title}>Tech specs</p>
        <table>
          <tbody className={styles.techSpecs__table}>
            <tr className={styles.techSpecs__row}>
              <td
                className={classNames(
                  styles.techSpecs__cell,
                  styles['techSpecs__cell-title'],
                )}
              >
                Screen
              </td>
              <td className={styles.techSpecs__cell}>
                {currentProduct.screen}
              </td>
            </tr>
            <tr className={styles.techSpecs__row}>
              <td
                className={classNames(
                  styles.techSpecs__cell,
                  styles['techSpecs__cell-title'],
                )}
              >
                Resolution
              </td>
              <td className={styles.techSpecs__cell}>
                {currentProduct.resolution}
              </td>
            </tr>
            <tr className={styles.techSpecs__row}>
              <td
                className={classNames(
                  styles.techSpecs__cell,
                  styles['techSpecs__cell-title'],
                )}
              >
                Processor
              </td>
              <td className={styles.techSpecs__cell}>
                {currentProduct.processor}
              </td>
            </tr>
            <tr className={styles.techSpecs__row}>
              <td
                className={classNames(
                  styles.techSpecs__cell,
                  styles['techSpecs__cell-title'],
                )}
              >
                RAM
              </td>
              <td className={styles.techSpecs__cell}>{currentProduct.ram}</td>
            </tr>
            <tr className={styles.techSpecs__row}>
              <td
                className={classNames(
                  styles.techSpecs__cell,
                  styles['techSpecs__cell-title'],
                )}
              >
                Built in memory
              </td>
              <td className={styles.techSpecs__cell}>
                {currentProduct.capacity}
              </td>
            </tr>
            {currentProduct.camera && (
              <tr className={styles.techSpecs__row}>
                <td
                  className={classNames(
                    styles.techSpecs__cell,
                    styles['techSpecs__cell-title'],
                  )}
                >
                  Camera
                </td>
                <td className={styles.techSpecs__cell}>
                  {currentProduct.camera}
                </td>
              </tr>
            )}
            <tr className={styles.techSpecs__row}>
              <td
                className={classNames(
                  styles.techSpecs__cell,
                  styles['techSpecs__cell-title'],
                )}
              >
                Zoom
              </td>
              <td className={styles.techSpecs__cell}>{currentProduct.zoom}</td>
            </tr>
            <tr className={styles.techSpecs__row}>
              <td
                className={classNames(
                  styles.techSpecs__cell,
                  styles['techSpecs__cell-title'],
                )}
              >
                Cell
              </td>
              <td className={styles.techSpecs__cell}>
                {currentProduct.cell.map(x => `${x} `)}
              </td>
            </tr>
          </tbody>
        </table>
      </article>

      <ProductsSlider products={similarProducts} title="You may also like" />
    </section>
  );
};
