import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';
import './ProductDetailsPage.scss';
import {
  getProductDetailsById,
  getProducts,
  getSuggestedProducts,
} from '../../services/products';
import { ProductDetails } from '../../types/ProductDetails';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { BackButton } from '../../components/BackButton';
import { BASE_URL } from '../../helpers/constants';
import { Icon } from '../../components/Icon';
import { IconType } from '../../types/IconTypes';
import { Specification } from '../../types/Specification';
import { Specs } from '../../components/Specs';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { Product } from '../../types/Product';
import { CartContext } from '../../components/CartContextProvider';
import { Loader } from '../../components/Loader';
import { Notification } from '../../components/Notification';
import { FavouritesContext } from '../../components/FavouritesContextProvider';
import { Colors } from '../../types/Colors';

export const ProductDetailsPage: React.FC = () => {
  const { state } = useLocation();
  const { id = '' } = useParams();
  const { cart, toggleCartItem } = useContext(CartContext);
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [
    productDetails,
    setProductDetails,
  ] = useState<ProductDetails | null>(null);

  const [
    currentImage,
    setCurrentImage,
  ] = useState(productDetails?.images[0] || '');

  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProduct(products.find((item) => item.itemId === id) || null);
  }, [id, products]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getProductDetailsById(id || '')
      .then(itemDetails => {
        setProductDetails(itemDetails);
        setCurrentImage(itemDetails.images[0]);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => {
    getProducts()
      .then(items => setProducts(items));
  }, []);

  useEffect(() => {
    getSuggestedProducts()
      .then((items => setSuggestedProducts(items)));
  }, []);

  const handleAddToCartClick = useCallback(() => {
    if (product) {
      toggleCartItem(product);
    }
  }, [product, toggleCartItem]);

  const isAddedToCart = useMemo(() => {
    return cart.some(({ id: cartId }) => cartId === product?.id);
  }, [product, cart]);

  const isFavourite = useMemo(() => {
    return favourites.some((item) => item.id === product?.id);
  }, [product, favourites]);

  const specs: Specification[] = useMemo(() => {
    return [
      { name: 'Screen', text: productDetails?.screen || '' },
      { name: 'Resolution', text: productDetails?.resolution || '' },
      { name: 'Processor', text: productDetails?.processor || '' },
      { name: 'RAM', text: productDetails?.ram || '' },
    ];
  }, [productDetails]);

  const techSpecs: Specification[] = useMemo(() => {
    return [
      ...specs,
      { name: 'Built in memory', text: productDetails?.capacity || '' },
      { name: 'Camera', text: productDetails?.camera || '' },
      { name: 'Zoom', text: productDetails?.zoom || '' },
      { name: 'Cell', text: productDetails?.cell.join(', ') || '' },
    ];
  }, [productDetails, specs]);

  const name = productDetails?.name || '';
  const images = productDetails?.images || [];
  const color = productDetails?.color || '';
  const colorsAvailable = productDetails?.colorsAvailable || [];
  const namespaceId = productDetails?.namespaceId || '';
  const capacity = productDetails?.capacity || '';
  const capacityAvailable = productDetails?.capacityAvailable || [];
  const priceDiscount = productDetails?.priceDiscount || 0;
  const priceRegular = productDetails?.priceRegular || 0;
  const description = productDetails?.description || [];

  return (
    <div className={classNames('product-details-page', {
      'product-details-page--loading-and-message': isLoading || isError,
    })}
    >
      {isLoading && (
        <Loader />
      )}

      {isError && !isLoading && (
        <Notification
          message="Product is not found. Please try again later..."
        />
      )}

      {!isLoading && !isError && (
        <div className="product-details-page__content">
          <div className="product-details-page__top">
            <BreadCrumbs />

            <BackButton prevLink={state || `../${product?.category}`} />
          </div>

          <h1 className="title product-details-page__title">
            {name}
          </h1>

          <div className="product-details-page__wrapper">
            <section className="product-details-page__product">
              <img
                src={`${BASE_URL}/${currentImage}`}
                alt="product"
                className="product-details-page__main-img"
              />

              <ul className="product-details-page__images">
                {images.map(image => (
                  <li key={image} className="product-details-page__img-box">
                    <button
                      type="button"
                      aria-label="choose image"
                      className="product-details-page__img-button"
                      onClick={() => setCurrentImage(image)}
                    >
                      <img
                        src={`${BASE_URL}/${image}`}
                        alt=""
                        className={classNames('product-details-page__img', {
                          'product-details-page__img--active': (
                            image === currentImage
                          ),
                        })}
                      />
                    </button>
                  </li>
                ))}
              </ul>

              <article className="product-details-page__info">
                <div className="product-details-page__options-container">
                  <p className="product-details-page__options-title">
                    Available colors
                  </p>
                  <ul className="product-details-page__options">
                    {colorsAvailable.map(availableColor => (
                      <li
                        key={availableColor}
                        className={
                          classNames('product-details-page__color-box', {
                            'product-details-page__color-box--active':
                              availableColor === color,
                          })
                        }
                      >
                        <Link
                          to={`../${namespaceId}-${capacity.toLowerCase()}-${availableColor}`}
                          className={classNames(
                            'product-details-page__color-option',
                            `product-details-page__color-option--${availableColor}`,
                          )}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="product-details-page__options-container">
                  <p className="product-details-page__options-title">
                    Select capacity
                  </p>
                  <ul className="product-details-page__options">
                    {capacityAvailable.map(capacityOption => (
                      <li
                        key={capacityOption}
                        className={
                          classNames('product-details-page__capacity-box', {
                            'product-details-page__capacity-box--active':
                              capacityOption === capacity,
                          })
                        }
                      >
                        <Link
                          to={`../${namespaceId}-${capacityOption.toLowerCase()}-${color}`}
                          className={classNames(
                            'product-details-page__capacity-option',
                          )}
                        >
                          {capacityOption}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="product-details-page__extra-info">
                  <div className="product-details-page__prices">
                    <p className="product-details-page__price">
                      {`$${priceDiscount}`}
                    </p>

                    <p
                      className={classNames(
                        'product-details-page__price',
                        'product-details-page__price--old',
                      )}
                    >
                      {`$${priceRegular}`}
                    </p>
                  </div>

                  <div className="product-details-page__interactions">
                    <button
                      type="button"
                      className={classNames(
                        'button',
                        'product-details-page__add-to-cart',
                        {
                          'product-details-page__add-to-cart--active': (
                            isAddedToCart
                          ),
                        },
                      )}
                      onClick={handleAddToCartClick}
                    >
                      Add to cart
                    </button>

                    <button
                      type="button"
                      data-cy="addToFavorite"
                      aria-label="add to favourite"
                      className="product-details-page__add-to-favourite"
                      onClick={() => {
                        if (product) {
                          toggleFavourite(product);
                        }
                      }}
                    >
                      {isFavourite ? (
                        <Icon
                          iconType={IconType.heartSelected}
                          color={Colors.red}
                        />
                      ) : (
                        <Icon iconType={IconType.heart} />
                      )}
                    </button>
                  </div>

                  <Specs specs={specs} />
                </div>

                <span className="product-details-page__id">
                  {`ID: ${product?.id || 0}`}
                </span>
              </article>
            </section>

            <section
              data-cy="productDescription"
              className="product-details-page__about"
            >
              <h2 className="product-details-page__subtitle">About</h2>

              <ul className="product-details-page__descriptions">
                {description.map(({ title, text }) => (
                  <li key={title} className="product-details-page__description">
                    <h3 className="product-details-page__description-title">
                      {title}
                    </h3>

                    <p className="product-details-page__description-text">
                      {text}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="product-details-page__tech-specs">
              <h2 className="product-details-page__subtitle">Tech Specs</h2>

              <Specs specs={techSpecs} />
            </section>
          </div>
        </div>
      )}

      {!isLoading && !isError && (
        <ProductSlider
          products={suggestedProducts}
          title="You may also like"
        />
      )}
    </div>
  );
};
