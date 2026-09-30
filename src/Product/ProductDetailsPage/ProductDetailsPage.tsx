/* eslint-disable @typescript-eslint/indent */
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchProducts } from '../../api/products';
import { useFavorite } from '../../context/FavoriteContext';
import { useCart } from '../../context/CartContext';

import { Loader } from '../../components/Loader/Loader';
import { useState, useEffect } from 'react';
import { getProductsByCategory } from '../../api/fetching';
import { Product, ProductDetails } from '../../Types/types';
import classNames from 'classnames';

import './ProductDetailsPage.scss';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

export const ProductDetailsPage = () => {
  //#region Logic
  const [productWithDetails, setProductWithDetails] =
    useState<ProductDetails | null>(null);

  const [isLoad, setIsLoad] = useState(false);
  const [errorMes, setErrorMes] = useState('');

  const [activePicIdx, setActivePicIdx] = useState<number>(0);

  const { products, isLoading, errorMessage, refetch } = useFetchProducts();
  const { productId, category } = useParams();
  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMes('');
    setIsLoad(true);

    if (
      category !== 'phones' &&
      category !== 'tablets' &&
      category !== 'accessories'
    ) {
      return;
    }

    getProductsByCategory(category)
      .then(items => {
        const currentProduct = items.find(item => item.id === productId);

        setProductWithDetails(currentProduct || null);
      })
      .catch(() => setErrorMes('Unable to load products'))
      .finally(() => {
        setIsLoad(false);
      });
  }, [productId, category]);

  const { favorites, addToFavorite, removeFromFavorite } = useFavorite();

  if (isLoading || isLoad) {
    return <Loader />;
  }

  if (errorMessage || errorMes) {
    return (
      <div>
        <p>Oops, something went wrong</p>
        <button onClick={refetch}>Reload</button>
      </div>
    );
  }

  if (!productWithDetails) {
    {
      return (
        <div>
          <p>No product found</p>
        </div>
      );
    }
  }

  const product: Product = {
    category: productWithDetails.category,
    itemId: productWithDetails.id,
    name: productWithDetails.name,
    fullPrice: productWithDetails.priceRegular,
    price: productWithDetails.priceDiscount,
    capacity: productWithDetails.capacity,
    color: productWithDetails.color,
    ram: productWithDetails.ram,
    screen: productWithDetails.screen,
    image: productWithDetails.images[0],
    year: 0,
  };

  const findAddedItem = cart.some(
    item => item.product.itemId === productWithDetails.id,
  );
  const findFavItem = favorites.some(
    item => item.product.itemId === productWithDetails.id,
  );
  const shuffled = () => {
    const filtered = [...products].filter(
      good => good.itemId !== productWithDetails.id,
    );

    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }

    return filtered.slice(0, 32);
  };

  const recommended = shuffled();

  const colorsChange = (color: string) =>
    `${productWithDetails.namespaceId}-${productWithDetails.capacity.toLowerCase()}-${color.split(' ').join('-').toLowerCase()}`;

  const capacityChange = (capacity: string) =>
    `${productWithDetails.namespaceId}-${capacity.toLowerCase()}-${productWithDetails.color.toLowerCase()}`;

  //#endregion

  return (
    <div className="productDetails">
      <div className="productDetails__content">
        <div>
          <button
            className="productDetails__back"
            type="button"
            onClick={() => navigate(-1)}
          >
            <span>&lsaquo;</span>
            <span>Back</span>
          </button>
        </div>
        <h2 className="productDetails__title">{productWithDetails.name}</h2>

        <div className="productDetails__top">
          <div className="productDetails__images">
            <div className="productDetails__images-box">
              {productWithDetails.images.map((image, index) => (
                <img
                  key={index}
                  src={`${image}`}
                  alt="product image"
                  className={classNames('productDetails__images-img', {
                    'productDetails__images-img--active':
                      index === activePicIdx,
                  })}
                  onClick={() => setActivePicIdx(index)}
                />
              ))}
            </div>
            <img
              className="productDetails__image"
              src={`${productWithDetails.images[activePicIdx]}`}
              alt="product image"
            />
          </div>

          <div className="productDetails__actions">
            <div className="productDetails__colors">
              <span className="productDetails__colors-title">
                Available colors
              </span>
              <div className="productDetails__colors-button">
                {productWithDetails.colorsAvailable.map((color, index) => (
                  <button
                    className="productDetails__btn"
                    key={index}
                    style={{
                      backgroundColor: `${color}`,
                    }}
                    onClick={() => {
                      const colorChanged = colorsChange(color);

                      return navigate(`/product/${category}/${colorChanged}`);
                    }}
                  />
                ))}
              </div>
            </div>
            <hr className="productDetails__divider" />
            <div className="productDetails__capacity">
              <span className="productDetails__capacity-title">
                Select capacity
              </span>
              <div className="productDetails__capacity-button">
                {productWithDetails.capacityAvailable.map((item, index) => (
                  <button
                    className={classNames('productDetails__capacity-btn', {
                      'productDetails__capacity-btn--active':
                        item === productWithDetails.capacity,
                    })}
                    type="button"
                    key={index}
                    onClick={() => {
                      const capacityChanged = capacityChange(item);

                      return navigate(
                        `/product/${category}/${capacityChanged}`,
                      );
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <hr className="productDetails__divider" />
            <div className="productDetails__price">
              {productWithDetails.priceDiscount ===
              productWithDetails.priceRegular ? (
                <span className="productDetails__price--full">
                  ${productWithDetails.priceRegular}
                </span>
              ) : (
                <>
                  <span className="productDetails__price--discount">
                    ${productWithDetails.priceDiscount}
                  </span>
                  <span className="productDetails__price--full">
                    ${productWithDetails.priceRegular}
                  </span>
                </>
              )}
            </div>
            <div className="productDetails__buttons">
              {findAddedItem ? (
                <button
                  type="button"
                  className="productDetails__buttons--add--added"
                  onClick={() => removeFromCart(product.itemId)}
                >
                  Added
                </button>
              ) : (
                <button
                  type="button"
                  className="productDetails__buttons--add"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              )}
              {findFavItem ? (
                <button
                  type="button"
                  className="productDetails__buttons--heart"
                  onClick={() => removeFromFavorite(product)}
                >
                  <img
                    src={`img/Icons/selected-heart-icon.svg`}
                    alt="selected heart button"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  className="productDetails__buttons--heart"
                  onClick={() => addToFavorite(product)}
                >
                  <img
                    src={`img/Icons/unselected-heart-icon.svg`}
                    alt="unselected heart button"
                  />
                </button>
              )}
            </div>
            <div className="productDetails__info">
              <span className="productDetails__info-title">Tech specs</span>
              <section className="productDetails__info-section">
                <span className="productDetails__info-section-title">
                  Screen
                </span>
                <span className="productDetails__info-section-value">
                  {productWithDetails.screen}
                </span>
              </section>
              <section className="productDetails__info-section">
                <span className="productDetails__info-section-title">
                  Resolution
                </span>
                <span className="productDetails__info-section-value">
                  {productWithDetails.resolution}
                </span>
              </section>

              <section className="productDetails__info-section">
                <span className="productDetails__info-section-title">
                  Processor
                </span>
                <span className="productDetails__info-section-value">
                  {productWithDetails.processor}
                </span>
              </section>
              <section className="productDetails__info-section">
                <span className="productDetails__info-section-title">RAM</span>
                <span className="productDetails__info-section-value">
                  {productWithDetails.ram}
                </span>
              </section>
            </div>
          </div>
        </div>

        <div className="productDetails__decription">
          <h3 className="productDetails__subTitle">About</h3>
          <hr className="productDetails__divider" />
          {productWithDetails.description.map((item, index) => (
            <div className="productDetails__decription-info" key={index}>
              <h4 className="productDetails__decription-infoTitle">
                {item.title}
              </h4>
              <p className="productDetails__decription-infoText">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="productDetails__productCard">
          <div className="productDetails__productCard-top">
            <span className="productDetails__productCard-title">
              You may also like
            </span>
          </div>
          <div className="productDetails__carts">
            <ProductsSlider products={recommended} />
          </div>
        </div>
      </div>
    </div>
  );
};
