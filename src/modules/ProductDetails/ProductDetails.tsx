import classNames from 'classnames';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pagetoolbar } from '../../components/layout/Pagetoolbar';
import { ProductColection } from '../../components/layout/ProductColection';
import { Button } from '../../components/ui/Button';
import { ButtonLiked } from '../../components/ui/ButtonLiked';
import { useCart } from '../../hooks/useCart';
import { useFavourites } from '../../hooks/useFavourites';
import { useProductDetails } from '../../hooks/useProductDetails';
import { useProducts } from '../../hooks/useProducts';
import { addProductToCart } from '../../store/cart/CartReducer';
import { toggleFavourites } from '../../store/favourites/FavouritesReducer';
import { imageUrl } from '../../utils/imageUrl';
import styles from './ProductDetails.module.scss';
import { ProductSkeleton } from './skeleton';

export const ProductDetails = () => {
  const navigate = useNavigate();
  const { category, productId } = useParams();
  const { favourites, setFavourites } = useFavourites();
  const { cart, setCart } = useCart();

  const { products, isLoading } = useProducts();
  const { product, isProductLoading } = useProductDetails(productId, category);
  const [preview, setPreview] = useState<string>('');

  useEffect(() => {
    if (product) {
      setPreview(product.images[0]);
    }
  }, [product]);

  const handleSettings = ({
    selectedColor,
    selectedCapacity,
  }: {
    selectedColor?: string;
    selectedCapacity?: string;
  }) => {
    const namespaceId = product?.namespaceId;
    const capacity = selectedCapacity ?? product?.capacity;
    const color = selectedColor ?? product?.color;

    navigate(
      `/catalog/${category}/${namespaceId}-${capacity?.toLocaleLowerCase()}-${color}`,
    );
  };

  const getRandomProducts = useMemo(() => {
    if (!products.length) {
      return null;
    }

    const filteredProducts = products.filter(
      item => item.category === category,
    );
    const shuffled = [...filteredProducts];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, 12);
  }, [products, category]);

  return (
    <div className={styles.container}>
      <Pagetoolbar breadcrumbs breadcrumbsName={product && product.name} back />
      {isProductLoading ? (
        <ProductSkeleton />
      ) : !product ? (
        <div className={styles.empty}>
          <img
            src={imageUrl('img/page-not-found.png')}
            alt=""
            className={styles.empty__img}
          />
          <h2 className={styles.empty__title}>Product not found!</h2>
          <Button onClick={() => navigate('/')}>Go home</Button>
        </div>
      ) : (
        <div className={styles.content}>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.header}>
            {product.images && (
              <div className={styles.photos}>
                {product.images.map((item, index) => {
                  return (
                    <button
                      onClick={() => setPreview(item)}
                      key={`${item}-${index}`}
                      type="button"
                      className={classNames(styles.photos__button, {
                        [styles.photos__button_active]: item === preview,
                      })}
                    >
                      <img
                        src={imageUrl(item)}
                        alt={item}
                        className={styles.photos__img}
                      />
                    </button>
                  );
                })}
              </div>
            )}
            <div className={styles.preview}>
              <img
                src={imageUrl(preview)}
                alt=""
                className={styles.preview__img}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.settings}>
                <div className={styles.details}>
                  <p className={styles.details__title}>Available colors</p>
                  <div className={styles.details__group}>
                    {product.colorsAvailable.map((item, index) => {
                      return (
                        <div key={`${item}-${index}`} className={styles.color}>
                          <input
                            type="radio"
                            id={`color-${index}`}
                            name="color"
                            aria-label={`color-${item}`}
                            value={item}
                            checked={item === product.color}
                            onChange={() =>
                              handleSettings({ selectedColor: item })
                            }
                            className={styles.color__input}
                          />

                          <label
                            aria-label={`color-${item}`}
                            htmlFor={`color-${index}`}
                            className={classNames(styles.color__label, {
                              [styles.color__label_active]:
                                item === product.color,
                            })}
                            style={{ backgroundColor: item }}
                          >
                            <span></span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.details}>
                  <p className={styles.details__title}>Select capacity</p>
                  <div className={styles.details__group}>
                    {product.capacityAvailable.map((item, index) => {
                      return (
                        <div
                          key={`${item}-${index}`}
                          className={styles.capacity}
                        >
                          <input
                            type="radio"
                            name="capacity"
                            id={`capacity-${index}`}
                            value={item}
                            checked={item === product.capacity}
                            onChange={() =>
                              handleSettings({ selectedCapacity: item })
                            }
                            className={styles.capacity__input}
                          />

                          <label
                            htmlFor={`capacity-${index}`}
                            className={classNames(styles.capacity__label, {
                              [styles.capacity__label_active]:
                                item === product.capacity,
                            })}
                          >
                            {item}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={styles.actions}>
                <div className={styles.price}>
                  <p className={styles.price__regular}>
                    ${product.priceDiscount}
                  </p>
                  {product.priceRegular && (
                    <p className={styles.price__discount}>
                      ${product.priceRegular}
                    </p>
                  )}
                </div>
                <div className={styles.buttons}>
                  <Button
                    isActive={cart.some(
                      item => item.product.itemId === product.id,
                    )}
                    maxWidth={'100%'}
                    onClick={() => {
                      setCart(
                        addProductToCart(
                          products.find(item => item.itemId === product.id)!,
                        ),
                      );
                    }}
                  >
                    {cart.some(item => item.product.itemId === product.id)
                      ? 'Delete from cart'
                      : 'Add to cart'}
                  </Button>
                  <ButtonLiked
                    isActive={favourites.some(
                      item => item.itemId === product.id,
                    )}
                    onClick={() => {
                      setFavourites(
                        toggleFavourites(
                          products.find(item => item.itemId === product.id)!,
                        ),
                      );
                    }}
                  />
                </div>
              </div>
              <ul className={styles.specs}>
                <li className={styles.specs__item}>
                  Screen
                  <span className={styles.specs__item_descr}>
                    {product.screen}
                  </span>
                </li>
                <li className={styles.specs__item}>
                  Resolution
                  <span className={styles.specs__item_descr}>
                    {product.resolution}
                  </span>
                </li>
                <li className={styles.specs__item}>
                  Processor
                  <span className={styles.specs__item_descr}>
                    {product.processor}
                  </span>
                </li>
                <li className={styles.specs__item}>
                  RAM
                  <span className={styles.specs__item_descr}>
                    {product.ram}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.about}>
            <div className={styles.about__block}>
              <h2 className={styles.about__title}>About</h2>
              {product.description.map((item, index) => {
                return (
                  <div key={index} className={styles.about__group}>
                    <h3 className={styles.about__subtitle}>{item.title}</h3>
                    {item.text.map((text, indexText) => {
                      return (
                        <p key={indexText} className={styles.about__text}>
                          {text}
                        </p>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className={styles.about__tech}>
              <h2 className={styles.about__title}>Tech specs</h2>
              <ul className={styles.about__list}>
                <li className={styles.about__list_item}>
                  Screen
                  <span className={styles.about__list_span}>
                    {product.screen}
                  </span>
                </li>
                <li className={styles.about__list_item}>
                  Resolution
                  <span className={styles.about__list_span}>
                    {product.resolution}
                  </span>
                </li>
                <li className={styles.about__list_item}>
                  Processor
                  <span className={styles.about__list_span}>
                    {product.processor}
                  </span>
                </li>
                <li className={styles.about__list_item}>
                  Ram
                  <span className={styles.about__list_span}>{product.ram}</span>
                </li>
                <li className={styles.about__list_item}>
                  Built in memory
                  <span className={styles.about__list_span}>
                    {product.capacity}
                  </span>
                </li>
                <li className={styles.about__list_item}>
                  Camera
                  <span className={styles.about__list_span}>
                    {product.camera}
                  </span>
                </li>
                <li className={styles.about__list_item}>
                  Zoom
                  <span className={styles.about__list_span}>
                    {product.zoom}
                  </span>
                </li>
                <li className={styles.about__list_item}>
                  Cell
                  <span className={styles.about__list_span}>
                    {product.cell.map(item => {
                      return `${item} `;
                    })}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className={styles.more}>
        <ProductColection
          title="You may also like"
          products={getRandomProducts}
          loading={isLoading}
        />
      </div>
    </div>
  );
};
