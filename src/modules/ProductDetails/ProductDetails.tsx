import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductsSlider } from '../HomePage/components/ProductsSlider';
import { selectingProducts } from '../utils/selectingProducts';
import { useContext, useEffect, useState } from 'react';
import { DispatchContext, StateContext } from '../utils/GlobalStateProvider';
import { getProducts } from '../utils/getProduct';
import { Product } from '../shared/components/types/Product';

import './ProductDetails.scss';
import { ProductUniversal } from '../shared/components/types/ProductUniversal';
import classNames from 'classnames';
import { SwippingWrapper } from '../shared/components/SwippingWrapper';
import { ProductStats } from './components/ProductStats/ProductStats';
import { Back } from '../shared/components/Back';

type FindBy = 'capacity' | 'color';

export const ProductDetails = () => {
  const location = useLocation();
  const { productId } = useParams();
  const { isDarkThemeOn, cartItems, likedItems } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const category = location.pathname.split('/')[1];
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<ProductUniversal | null>(null);
  const [slidePosition, setSlidePosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sliderInterval = 5000;
  const isLoadingClass = isLoading ? 'product-details--is-loading' : '';
  const isProductInCart = cartItems.some(
    item => item.itemId === (product?.id || 0),
  );
  const isItemLiked = likedItems.some(item => item.itemId === product?.id);

  const tempColor = product?.color;

  const handleChangeSlidePosition = (el: number) => {
    if (product && (el < 0 || el > product?.images.length - 1)) {
      return;
    }

    setSlidePosition(el);
  };

  const handleChangeParam = (elem: string, needToChange: FindBy) => {
    let productParams = location.pathname.split('/')[2].split('-');
    let capacityIndex = 0;
    const elemWithoutSpace = elem.split(' ').join('-');

    const isItDoubleColorName = tempColor?.split(' ').length === 2;

    switch (needToChange) {
      case 'capacity':
        capacityIndex = isItDoubleColorName
          ? productParams.length - 3
          : productParams.length - 2;

        break;
      case 'color':
        capacityIndex = isItDoubleColorName
          ? productParams.length - 2
          : productParams.length - 1;

        productParams = isItDoubleColorName
          ? productParams.slice(0, -1)
          : productParams;
        break;
    }

    const newProduct = productParams.map((param, i) =>
      i === capacityIndex
        ? elemWithoutSpace.toLocaleLowerCase()
        : param.toLocaleLowerCase(),
    );

    navigate(`../${newProduct.join('-')}`, { replace: true });
  };

  const handleAddingProduct = () => {
    if (product) {
      dispatch({
        type: 'setCartItems',
        payload: [
          ...cartItems,
          products.find(elem => elem.itemId === product.id) as Product,
        ],
      });
    }
  };

  const handleAddLikedProduct = () => {
    if (product) {
      if (isItemLiked) {
        dispatch({
          type: 'setLikedItems',
          payload: [...likedItems.filter(item => item.itemId !== product?.id)],
        });

        return;
      }

      dispatch({
        type: 'setLikedItems',
        payload: [
          ...likedItems,
          products.find(elem => elem.itemId === product.id) as Product,
        ],
      });
    }
  };

  const LikeIcon = () => {
    return isDarkThemeOn ? (
      <img src="./img/icons/like.svg" alt="like icon" />
    ) : (
      <img src="./img/icons/like-dark.svg" alt="like icon" />
    );
  };

  useEffect(() => {
    setSlidePosition(0);
    setIsLoading(true);

    getProducts(`api/${category}.json`).then(
      (tempProducts: ProductUniversal[]) => {
        const tempProduct = tempProducts.find(elem =>
          elem.id.includes(productId || ''),
        );

        setProduct(tempProduct as unknown as ProductUniversal);

        document.title = '' + tempProduct?.name;
      },
    );
    getProducts(`api/products.json`)
      .then(setProducts)
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, productId]);

  useEffect(() => {
    const lastPosition = (product?.images.length || 0) - 1;

    if (slidePosition < 0) {
      setSlidePosition(lastPosition);
    }

    if (slidePosition > lastPosition) {
      setSlidePosition(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slidePosition]);

  useEffect(() => {
    const slider = setInterval(() => {
      setSlidePosition(slidePosition + 1);
    }, sliderInterval);

    return () => clearInterval(slider);
  }, [slidePosition]);

  return (
    <>
      <main className="product-details">
        {product ? (
          <>
            <div className="product-details__face" id="welcome">
              <div className="product-details__breadcrumbs">
                <div
                  className={isLoadingClass}
                  style={{ backgroundColor: 'transparent' }}
                >
                  <Breadcrumbs path={product.name} />
                </div>
              </div>
              <Back />
              <section className={`product-details__content ${isLoadingClass}`}>
                <h1 className="product-details__title">{product.name}</h1>
                <div className="product-details__content-wrapper">
                  <div className="product-details__slider">
                    <SwippingWrapper
                      handleChangeSlidePosition={handleChangeSlidePosition}
                      slidePosition={slidePosition}
                    >
                      <div className="product-details__slider-main">
                        {product.images.map((img, i) => (
                          <div
                            key={`div-slider-${i}`}
                            className={classNames(
                              'product-details__slider-main-wrapper',
                              'product-details--is-loading',
                            )}
                            style={{
                              transform: `translateX(${slidePosition * -100}%)`,
                            }}
                          >
                            <img
                              src={img}
                              alt={`image${i}`}
                              key={`img-main-${i}`}
                            />
                          </div>
                        ))}
                      </div>
                    </SwippingWrapper>
                    <div
                      className={`product-details__slider-btns ${isLoadingClass}`}
                    >
                      {product.images.map((img, i) => (
                        <button
                          className={classNames(
                            'product-details__slider-wrapper',
                            {
                              'product-details__slider-wrapper--active':
                                i === slidePosition,
                            },
                          )}
                          key={`slider-img-${i}`}
                          onClick={() => handleChangeSlidePosition(i)}
                        >
                          <img src={img} alt={`image${i}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="product-details__info">
                    <div className="product-details__colors">
                      <small>Available colors</small>
                      <div
                        className={`product-details__colors-wrapper ${isLoadingClass}`}
                      >
                        {product.colorsAvailable.map((color, i) => (
                          <button
                            className={classNames(
                              'product-details__color-wrapper',
                              {
                                'product-details__color-wrapper--is-active':
                                  color === product.color,
                              },
                            )}
                            key={`color-wrapper-${i}`}
                            onClick={() => handleChangeParam(color, 'color')}
                          >
                            <Link
                              to={'..'}
                              style={{ backgroundColor: color }}
                              className={classNames(
                                `product-details__color`,
                                `product-details__color--${color.split(' ').join('-')}`,
                                {
                                  [color.split(' ').join('-')]: color,
                                },
                              )}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div
                      className={`product-details__capacities ${isLoadingClass}`}
                    >
                      <small>Select capacity</small>
                      <div className="product-details__capacities-wrapper">
                        {product.capacityAvailable.map(capacity => (
                          <button
                            className={classNames('product-details__capacity', {
                              [isDarkThemeOn
                                ? 'product-details__capacity--active'
                                : 'product-details__capacity--active-dark']:
                                capacity === product.capacity,
                              'product-details__capacity-dark': !isDarkThemeOn,
                            })}
                            key={`capacity-btn-${capacity}`}
                            onClick={() =>
                              handleChangeParam(capacity, 'capacity')
                            }
                            disabled={capacity === product.capacity}
                          >
                            {capacity.split('GB').join(' GB')}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="product-details__controls">
                      <div className="product-details__price-wrapper">
                        <h2 className="product-details__price">
                          ${product.priceDiscount}
                        </h2>
                        <h3 className="discount">${product.priceRegular}</h3>
                      </div>
                      <div className="product-details__btns">
                        <button
                          disabled={isProductInCart}
                          onClick={handleAddingProduct}
                          className={classNames(
                            'product-details__btn',
                            'btn-add',
                            'btn-add--large',
                            {
                              'btn-add--disabled': isProductInCart,
                              'btn-add--dark': !isDarkThemeOn,
                            },
                          )}
                        >
                          {isProductInCart ? 'Added' : 'Add to cart'}
                        </button>
                        <button
                          className={classNames(
                            'product-details__btn',
                            'btn-like',
                            'btn-like--large',
                            {
                              'btn-like--dark': !isDarkThemeOn,
                            },
                          )}
                          onClick={handleAddLikedProduct}
                        >
                          {isItemLiked ? (
                            <img
                              src="./img/icons/like-filled.svg"
                              alt="like icon active"
                            />
                          ) : (
                            <LikeIcon />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className={`product-details__stats ${isLoadingClass}`}>
                      <ProductStats product={product} />
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="product-details__sections-wrapper">
              <section className="product-details__about">
                <h3 className="product-details__subtitle">About</h3>
                {product.description.map(elem => (
                  <article
                    className="product-details__description"
                    key={`key-${elem.title}`}
                  >
                    <h4 className="product-details__description-title">
                      {elem.title}
                    </h4>
                    <p className="product-details__description-text">
                      {elem.text}
                    </p>
                  </article>
                ))}
              </section>
              <section className="product-details__tech">
                <h3>Tech specs</h3>
                <div className={`product-details__stats ${isLoadingClass}`}>
                  <ProductStats product={product} isFullList={true} />
                </div>
              </section>
            </div>
            <ProductsSlider
              isLoading={isLoading}
              title="You may also like"
              name="models"
              products={selectingProducts(products, 'brand-new')}
              key="models"
            />
          </>
        ) : (
          <div className="product-details__error">
            <h1>Product was not found!</h1>
          </div>
        )}
      </main>
      <Outlet />
    </>
  );
};
