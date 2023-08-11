/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import './ProductDetailsPage.scss';
import { Loader } from '../../components/Loader';
import { Button } from '../../components/Button/Button';
import { ProductSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { GoBackButton } from '../../components/GoBackButton/GoBackButton';
import { Product } from '../../types/Product';
import { calculateDiscount } from '../../helpers/calculateDiscount';
import { isItemIncluded } from '../../helpers/isItemIncluded';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { add as addToCart } from '../../features/cart/cartSlice';
import {
  add as addFavourite,
  remove as removeFavourite,
} from '../../features/favourites/favouritesSlice';
import {
  useGetProductDetailsQuery,
  useGetProductsQuery,
} from '../../features/api/apiSlice';

export const ProductDetailsPage = () => {
  const { data: products = [] } = useGetProductsQuery();
  const { productId = '' } = useParams();
  const {
    data: productDetails,
    isLoading,
    isFetching,
    isError: productNotFound,
  } = useGetProductDetailsQuery(productId);

  const [imageId, setImageId] = useState(0);
  const [capacityId, setCapacityId] = useState(0);
  const [colorId, setClolorId] = useState(0);

  const capacities = ['64 GB', '256 GB', '512 GB'];
  const colors = ['#fcdbc1', '#5f7170', '#4c4c4c', '#f0f0f0'];

  const cart = useAppSelector(state => state.cart);
  const favourites = useAppSelector(state => state.favourites);
  const dispatch = useAppDispatch();

  const isItemInCart = useMemo(() => {
    return isItemIncluded(cart, productId);
  }, [cart, productId]);

  const isItemInFavourites = useMemo(() => {
    return isItemIncluded(favourites, productId);
  }, [favourites, productId]);

  const product = useMemo(() => {
    return products.find(item => item.id === productId);
  }, [products, productId]) as Product;

  const sellPrice = useMemo(() => {
    if (product) {
      return calculateDiscount(product);
    }

    return 0;
  }, [product]);

  const suggestedProducts = useMemo(() => {
    return products.slice(4, 16);
  }, [products]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const onAddtoCart = () => {
    if (isItemInCart) {
      return;
    }

    dispatch(addToCart(product));
  };

  const onAddToFavourites = () => {
    if (isItemInFavourites) {
      dispatch(removeFavourite(product.id));

      return;
    }

    dispatch(addFavourite(product));
  };

  return (
    <div className="ProductDetailsPage container">
      <div className="ProductDetailsPage__breadcrumbs">
        <Breadcrumbs />
      </div>

      <div className="ProductDetailsPage__return">
        <GoBackButton />
      </div>

      {productNotFound && (
        <h1 className="ProductDetailsPage__not-found">
          Product was not found
        </h1>
      )}

      {(isLoading || isFetching) && (
        <div className="ProductDetailsPage__loader">
          <Loader />
        </div>
      )}

      {!isLoading && !isFetching && !productNotFound && (
        <>
          <div className="ProductDetailsPage__content">
            <section
              className="ProductDetailsPage__main-content grid section"
            >
              <h1 className="ProductDetailsPage__title">
                {productDetails?.name}
              </h1>

              <aside className="ProductDetailsPage__thumbnails">
                <ul>
                  {productDetails?.images.map((imgUrl, index) => (
                    <li key={imgUrl}>
                      <button
                        type="button"
                        onClick={() => setImageId(index)}
                        className={classNames(
                          'ProductDetailsPage__thumbnail-button',
                          { active: imageId === index },
                        )}
                      >
                        <img
                          src={imgUrl}
                          alt="thumbnail"
                          className="ProductDetailsPage__thumbnail"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>

              <div className="ProductDetailsPage__image-main">
                <img src={productDetails?.images[imageId]} alt="product" />
              </div>

              <div className="ProductDetailsPage__actions">
                <div className="ProductDetailsPage__selectors">
                  <p>
                    Available colors
                  </p>

                  <ul>
                    {colors.map((color, index) => (
                      <li key={color}>
                        <Button
                          variant="color"
                          className={classNames(
                            { active: colorId === index },
                          )}
                          onClick={() => setClolorId(index)}
                        >
                          <span style={{ backgroundColor: color }} />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="ProductDetailsPage__selectors">
                  <p>
                    Select capacity
                  </p>

                  <ul>
                    {capacities.map((capacity, index) => (
                      <li key={capacity}>
                        <Button
                          variant="text"
                          className={classNames(
                            { active: capacityId === index },
                          )}
                          onClick={() => setCapacityId(index)}
                        >
                          {capacity}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="ProductDetailsPage__actions-container">
                  <div className="ProductDetailsPage__price">
                    <h2 className="ProductDetailsPage__price-sell">
                      {`$${sellPrice}`}
                    </h2>

                    {!!product?.discount && (
                      <p className="ProductDetailsPage__price-full">
                        {`$${product.price}`}
                      </p>
                    )}
                  </div>

                  <div className="ProductDetailsPage__buttons">
                    <Button
                      variant="cart"
                      className={classNames(
                        'ProductDetailsPage__button-cart',
                        { active: isItemInCart },
                      )}
                      onClick={onAddtoCart}
                    >
                      {isItemInCart
                        ? 'Added to cart'
                        : 'Add to cart'}
                    </Button>

                    <Button
                      variant="favourite"
                      data-cy="addToFavorite"
                      className={classNames(
                        'ProductDetailsPage__button-favourite',
                        { active: isItemInFavourites },
                      )}
                      onClick={onAddToFavourites}
                    />
                  </div>
                </div>

                <div className="ProductDetailsPage__specs-small">
                  <table className="ProductDetailsPage__specs-table">
                    <tbody>
                      <tr>
                        <td>Screen</td>
                        <td>{productDetails?.display.screenSize || '-'}</td>
                      </tr>
                      <tr>
                        <td>Resolution</td>
                        <td>
                          {productDetails?.display.screenResolution || '-'}
                        </td>
                      </tr>
                      <tr>
                        <td>Processor</td>
                        <td>{productDetails?.hardware.cpu || '-'}</td>
                      </tr>
                      <tr>
                        <td>RAM</td>
                        <td>{productDetails?.storage.ram || '-'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <div className="ProductDetailsPage__details grid section">
              <section
                className="ProductDetailsPage__about"
                data-cy="productDescription"
              >
                <p className="ProductDetailsPage__about-subtitle">
                  About
                </p>
                <p className="ProductDetailsPage__about-description">
                  {productDetails?.description}
                </p>
              </section>

              <section className="ProductDetailsPage__techspecs">
                <p className="ProductDetailsPage__about-subtitle">
                  Tech specs
                </p>
                <table className="ProductDetailsPage__techspecs-table">
                  <tbody>
                    <tr>
                      <td>Screen</td>
                      <td>{productDetails?.display.screenSize || '-'}</td>
                    </tr>
                    <tr>
                      <td>Resolution</td>
                      <td>
                        {productDetails?.display.screenResolution || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td>Processor</td>
                      <td>{productDetails?.hardware.cpu || '-'}</td>
                    </tr>
                    <tr>
                      <td>RAM</td>
                      <td>{productDetails?.storage.ram || '-'}</td>
                    </tr>
                    <tr>
                      <td>Built in memory</td>
                      <td>{productDetails?.storage.flash || '-'}</td>
                    </tr>
                    <tr>
                      <td>Camera</td>
                      <td>{productDetails?.camera.primary || '-'}</td>
                    </tr>
                    <tr>
                      <td>Additional Features</td>
                      <td>{productDetails?.additionalFeatures || '-'}</td>
                    </tr>
                    <tr>
                      <td>Cell</td>
                      <td>{productDetails?.connectivity.cell || '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </div>

          <div className="ProductDetailsPage__suggested">
            <h2>
              You may also like
            </h2>

            <ProductSlider products={suggestedProducts} />
          </div>
        </>
      )}
    </div>
  );
};
