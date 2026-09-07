import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useParams, Link } from 'react-router-dom';
import { ProductCagetories } from '../../../../types/ProductCategories';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import * as productDetailsActions from '../../../../features/productDetails/productDetails';
import styles from './ProductDetails.module.scss';
import * as listsOfParams from '../../constants/listsOfParams';
import { colorHexMap } from '../../constants/listOfColors';
import { ProductLoader } from '../ProductLoader';
import { actions as favouritesActions } from '../../../../features/favourites/favourites';
import { actions as cartActions } from '../../../../features/cart/cart';
import { Cart } from '../../../../features/cart/types/Cart';

export const ProductDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, product, error } = useAppSelector(
    state => state.productDetails,
  );
  const { favourites } = useAppSelector(state => state.favourites);
  const { products } = useAppSelector(state => state.products);
  const { cart } = useAppSelector(state => state.cart);
  const { productsPage, productId } = useParams();
  const category = productsPage as ProductCagetories;
  const [currentImage, setCurrentImage] = useState(product?.images[0]);
  const productInfo = products.find(p => p.itemId === product?.id);

  useEffect(() => {
    if (product?.images) {
      setCurrentImage('./' + product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    if (productId) {
      dispatch(productDetailsActions.init({ category, productId }));
    }
  }, [productId]);

  const currentColor = product?.color.replaceAll(' ', '-') || '';
  const currenCapacity = product?.capacity.toLowerCase() || '';
  const checkCart = cart.some(g => g.itemId === product?.id);

  const cartItem: Cart = {
    itemId: productInfo?.itemId || '',
    category: productInfo?.category || '',
    image: productInfo?.image || '',
    quantity: 1,
    name: productInfo?.name || '',
    price: productInfo?.price || 0,
  };

  return (
    <div className={`page__product-details ${styles['product-details']}`}>
      <div className={styles['product-details__container']}>
        {loading && <ProductLoader />}

        {error && <p>{error}</p>}

        {!loading && !error && !product && (
          <p className="title">Product was not found</p>
        )}

        {product && (
          <>
            <h2 className={styles['product-details__title']}>
              {product?.name}
            </h2>

            <div className={styles['product-details__wrapper']}>
              <div className={styles['product-details__images']}>
                <div className={styles['product-details__swiper']}>
                  {product?.images.map(img => {
                    const link = './' + img;

                    return (
                      <div
                        className={styles['product-details__swiper-wrapper']}
                        key={crypto.randomUUID()}
                        style={{
                          border:
                            link === currentImage ? 'solid black 1px' : '',
                        }}
                        onClick={() => setCurrentImage(link)}
                      >
                        <img src={link} alt="Product Image"></img>
                      </div>
                    );
                  })}
                </div>

                <div className={styles['product-details__image']}>
                  <img src={currentImage} alt="Product Image" />
                </div>
              </div>

              <div className={styles['product-details__inner']}>
                <div className={styles['product-details__params']}>
                  <div className={styles['product-details__colors']}>
                    <h5 className={styles['product-details__crown']}>
                      Available colors
                    </h5>
                    <ul className={styles['product-details__list']}>
                      {product?.colorsAvailable.map(c => {
                        const normilizeColor = c.replaceAll(' ', '-');
                        const selectedColor = productId?.replace(
                          currentColor,
                          `${normilizeColor}`,
                        );

                        return (
                          <li
                            className={`${styles['product-details__item']} ${styles['product-details--color']}`}
                            key={c}
                          >
                            <Link to={`../${selectedColor}`}>
                              <label
                                htmlFor={c}
                                className={cn(
                                  styles['product-details__color'],
                                  {
                                    [styles.selected]:
                                      currentColor === normilizeColor,
                                  },
                                )}
                              >
                                <span
                                  style={{ backgroundColor: colorHexMap[c] }}
                                ></span>
                              </label>
                              <input
                                id={c}
                                type="radio"
                                name="color"
                                onChange={() => {}}
                                checked={product.color === c}
                              />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className={styles['product-details__capacity']}>
                    <h5 className={styles['product-details__crown']}>
                      Select capacity
                    </h5>
                    <ul className={styles['product-details__list']}>
                      {product?.capacityAvailable.map(c => {
                        const selectedCapacity = productId?.replace(
                          currenCapacity,
                          `${c.toLowerCase()}`,
                        );

                        return (
                          <li
                            className={cn(
                              styles['product-details__item'],
                              styles['product-details--capacity'],
                            )}
                            key={c}
                          >
                            <Link to={`../${selectedCapacity}`}>
                              <label
                                htmlFor="capacity"
                                className={cn(
                                  styles['product-details__value'],
                                  {
                                    [styles.selected]: product.capacity === c,
                                  },
                                )}
                              >
                                {c}
                              </label>
                              <input
                                id="capacity"
                                type="radio"
                                name="capacity"
                              />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className={styles['product-details__prices']}>
                    <div className={styles['product-details__discount']}>
                      ${product?.priceDiscount}
                    </div>
                    <div className={styles['product-details__price']}>
                      ${product?.priceRegular}
                    </div>
                  </div>

                  <div className={styles['product-details__buttons']}>
                    <button
                      className={cn(
                        styles['product-details__button'],
                        'button-add',
                        'button-add--big',
                        {
                          'button-add--added': checkCart,
                        },
                      )}
                      onClick={e => {
                        dispatch(cartActions.addToCart(cartItem));
                        e.preventDefault();
                      }}
                      disabled={checkCart}
                    >
                      {checkCart ? 'Added' : 'Add to cart'}
                    </button>

                    <button
                      className={`${styles['product-details__button']} button-like button-like--big`}
                      onClick={() =>
                        productInfo
                          ? dispatch(
                              favouritesActions.toggleFavourite(productInfo),
                            )
                          : ''
                      }
                    >
                      <span
                        className={cn('button-like__icon', {
                          'button-like--liked': favourites.some(
                            g => g.itemId === product.id,
                          ),
                        })}
                      ></span>
                    </button>
                  </div>

                  <ul className={styles['product-details__details']}>
                    {listsOfParams.sListOfParams.map((item, index) => (
                      <li
                        key={index}
                        className={styles['product-details__infection']}
                      >
                        <h5 className={styles['product-details__crown']}>
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </h5>
                        <p className={styles['product-details__param']}>
                          {product?.[item]}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles['product-details__id']}>
                  ID: {product?.id}
                </div>
              </div>
            </div>

            <div className={styles['product-details__row']}>
              <div className={styles['product-details__column']}>
                <h3 className={styles['product-details__subtitle']}>About</h3>
                {product?.description.map(desc => (
                  <div
                    className={styles['product-details__block']}
                    key={crypto.randomUUID()}
                  >
                    <h4 className={styles['product-details__belt']}>
                      {desc.title}
                    </h4>
                    <p className={styles['product-details__text']}>
                      {desc.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className={styles['product-details__column']}>
                <h3 className={styles['product-details__subtitle']}>
                  Tech specs
                </h3>
                <ul className={styles['product-details__techs']}>
                  {listsOfParams.lListOfParams.map((spec, index) => (
                    <li key={index} className={styles['product-details__tech']}>
                      <h5 className={styles['product-details__call']}>
                        {spec.charAt(0).toUpperCase() + spec.slice(1)}
                      </h5>
                      <p className={styles['product-details__spec']}>
                        {spec === 'cell'
                          ? product?.cell
                              .map(
                                (c, i) =>
                                  `${c}${i + 1 !== product?.cell.length ? ',' : ''}`,
                              )
                              .join(' ')
                          : product?.[spec] || '-'}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
