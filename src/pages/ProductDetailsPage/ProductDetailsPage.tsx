import {
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import {
  useOutletContext,
  useParams,
} from 'react-router-dom';
import classNames from 'classnames';
import './ProductDetailsPage.scss';
import { getProduct } from '../../api/products';
import { Loader } from '../../components/Loader';
import { ProductDetails } from '../../types/ProductDetails';
import { Button } from '../../components/Button/Button';
import { Product } from '../../types/Product';
import { calculateDiscount } from '../../helpers/calculateDiscount';
import { ProductSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { GoBackButton } from '../../components/GoBackButton/GoBackButton';
import { CartContext } from '../../components/GlobalCartProvider';
import { FavouriteContext } from '../../components/GlobalFavouritesProvider';
import { ActionType, useProductReducer } from '../../hooks/useProductReducer';

export const ProductDetailsPage = () => {
  const products = useOutletContext<Product[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [productNotFound, setProductNotFound] = useState(false);

  const [
    productDetails,
    setProductDetails,
  ] = useState<ProductDetails | null>(null);

  const [{
    colorId,
    capacityId,
    imageId,
  }, dispatch] = useProductReducer();

  const { productId = '' } = useParams();

  const { cart, setCart } = useContext(CartContext);
  const { favourites, setFavourites } = useContext(FavouriteContext);

  const itemInCart = cart.some(cartItem => cartItem.id === productId);
  const itemInFavourites = favourites.includes(productId);

  const product = useMemo(() => {
    return products.find(item => item.id === productId);
  }, [products]);

  const sellPrice = useMemo(() => {
    if (product) {
      return calculateDiscount(product);
    }

    return 0;
  }, [product]);

  const suggestedProducts = useMemo(() => {
    return products.slice(4, 16);
  }, [products]);

  const loadProduct = async () => {
    setIsLoading(true);

    try {
      const productFromServer = await getProduct(productId);

      setProductDetails(productFromServer);
    } catch {
      setProductNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (products.length) {
      loadProduct();
    }

    window.scrollTo(0, 0);
  }, [productId]);

  const onAddtoCart = () => {
    if (itemInCart) {
      return;
    }

    setCart([...cart, {
      id: productId,
      quantity: 1,
    }]);
  };

  const onAddToFavourites = () => {
    if (itemInFavourites) {
      setFavourites(
        favourites.filter(id => id !== productId),
      );

      return;
    }

    setFavourites([...favourites, productId]);
  };

  const onSetImageId = (id: number) => {
    dispatch({
      type: ActionType.changedImage,
      value: id,
    });
  };

  const onSetColorId = (id: number) => {
    dispatch({
      type: ActionType.changedColor,
      value: id,
    });
  };

  const onSetCapacityId = (id: number) => {
    dispatch({
      type: ActionType.changedCapacity,
      value: id,
    });
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

      {isLoading && (
        <div className="ProductDetailsPage__loader">
          <Loader />
        </div>
      )}

      {!isLoading && !productNotFound && (
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
                        onClick={onSetImageId.bind(null, index)}
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
                    <li>
                      <Button
                        content="color"
                        className={classNames(
                          { active: colorId === 0 },
                          'ProductDetailsPage__colorPicker-1',
                        )}
                        onClick={() => onSetColorId(0)}
                      />
                    </li>
                    <li>
                      <Button
                        content="color"
                        className={classNames(
                          { active: colorId === 1 },
                          'ProductDetailsPage__colorPicker-2',
                        )}
                        onClick={() => onSetColorId(1)}
                      />
                    </li>
                    <li>
                      <Button
                        content="color"
                        className={classNames(
                          { active: colorId === 2 },
                          'ProductDetailsPage__colorPicker-3',
                        )}
                        onClick={() => onSetColorId(2)}
                      />
                    </li>
                    <li>
                      <Button
                        content="color"
                        className={classNames(
                          { active: colorId === 3 },
                          'ProductDetailsPage__colorPicker-4',
                        )}
                        onClick={() => onSetColorId(3)}
                      />
                    </li>
                  </ul>
                </div>

                <div className="ProductDetailsPage__selectors">
                  <p>
                    Select capacity
                  </p>

                  <ul>
                    <li>
                      <Button
                        content="text"
                        className={classNames(
                          { active: capacityId === 0 },
                        )}
                        onClick={() => onSetCapacityId(0)}
                      >
                        64 GB
                      </Button>
                    </li>
                    <li>
                      <Button
                        content="text"
                        className={classNames(
                          { active: capacityId === 1 },
                        )}
                        onClick={() => onSetCapacityId(1)}
                      >
                        256 GB
                      </Button>
                    </li>
                    <li>
                      <Button
                        content="text"
                        className={classNames(
                          { active: capacityId === 2 },
                        )}
                        onClick={() => onSetCapacityId(2)}
                      >
                        512 GB
                      </Button>
                    </li>
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
                      content="cart"
                      className={classNames(
                        'ProductDetailsPage__button-cart',
                        { active: itemInCart },
                      )}
                      onClick={onAddtoCart}
                    >
                      {itemInCart
                        ? 'Added to cart'
                        : 'Add to cart'}
                    </Button>

                    <Button
                      content="favourite"
                      data-cy="addToFavorite"
                      className={classNames(
                        'ProductDetailsPage__button-favourite',
                        { active: itemInFavourites },
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
