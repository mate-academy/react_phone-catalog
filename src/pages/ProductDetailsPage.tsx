/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import cn from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Phone } from '../types/Phone';
import { ProductDetails } from '../types/ProductDetails';
import { CartContext } from '../context/CardContext';
import { FavouriteContext } from '../context/FavouriteContext';
import { getProduct } from '../api';
import { Loader } from '../components/Loader/Loader';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { BackButton } from '../components/BackButton';
import { AddToCart } from '../components/AddToCard';
import { AddToFavourites } from '../components/AddToFavourites';
import { ProductSlider } from '../components/ProductSlider';
import './ProductDetailsPage.scss';

type Props = {
  products: Phone[];
};

export const ProductCardPage: React.FC<Props> = ({ products }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentProductDetails, setCurrentProductDetails]
  = useState<ProductDetails>();
  const [currentProduct, setCurrentProduct] = useState<Phone>();
  const [currentImage, setCurrentImage]
  = useState<string | undefined>(currentProduct?.image);

  const location = useLocation();
  const { pathname } = location;
  const { productId = '' } = useParams();

  const { productsInCart, setProductsInCart } = useContext(CartContext);
  const { favouriteProducts, setFavouriteProducts }
  = useContext(FavouriteContext);

  const getCurrentProduct = async () => {
    try {
      const details = await getProduct(productId);
      const prod = products.find((product) => product.phoneId === productId);

      if (productId === details.id) {
        setCurrentProduct(prod);
        setCurrentProductDetails(details);
      }
    } catch (error) {
      throw new Error('Error product details');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getCurrentProduct();
      setIsLoading(false);
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCurrentProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    if (currentProductDetails?.images[0] !== currentImage) {
      setCurrentImage(currentProductDetails?.images[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProductDetails?.images]);

  const isItemInCart = productsInCart.some(
    (cartItem) => cartItem.phoneId === currentProductDetails?.id,
  );

  const handleAddToCart = () => {
    if (isItemInCart) {
      const updatedCart = productsInCart.filter(
        (cartItem) => cartItem.phoneId !== currentProductDetails?.id,
      );

      setProductsInCart(updatedCart);

      return;
    }

    if (currentProduct) {
      const newProd = {
        ...currentProduct,
        quantity: 1,
      };

      setProductsInCart([...productsInCart, newProd]);
    }
  };

  const isItemFavourite = favouriteProducts.some(
    (fav) => fav.phoneId === currentProductDetails?.id,
  );

  const handleAddToFavourites = () => {
    if (isItemFavourite) {
      const updateFavourites = favouriteProducts.filter(
        (fav) => fav.phoneId !== currentProductDetails?.id,
      );

      setFavouriteProducts(updateFavourites);

      return;
    }

    if (currentProduct) {
      setFavouriteProducts([...favouriteProducts, currentProduct]);
    }
  };

  const suggestedProducts = useMemo(() => {
    const reccomended = [...products].sort(() => Math.random() - 0.5);

    return reccomended.filter((prod) => prod.id !== currentProduct?.id);
  }, [products, currentProduct]);

  const handleImageClick = (image: string) => {
    setCurrentImage(image);
  };

  return (
    <div className="ProductDetailsPage">
      {isLoading && <Loader />}

      <div className="container">
        {currentProductDetails && !isLoading && (
          <div className="ProductDetailsPage__content">
            <BreadCrumbs />

            <div className="productPage__back">
              <BackButton />
            </div>

            <h1 className="ProductDetailsPage__title">
              {currentProductDetails?.name}
            </h1>

            <div className="ProductDetailsPage__main">
              <ul className="ProductDetailsPage__list">
                {currentProductDetails?.images.map((image) => (
                  <li
                    key={image}
                    className="ProductDetailsPage__photo"
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      className="ProductDetailsPage__photo-img"
                      src={`https://mate-academy.github.io/react_phone-catalog/_new/${image}`}
                      alt="product img"
                    />
                  </li>
                ))}
              </ul>

              <div className="ProductDetailsPage__current">
                <img
                  src={`https://mate-academy.github.io/react_phone-catalog/_new/${currentImage}`}
                  alt="main img"
                  className="ProductDetailsPage__current-img"
                />
              </div>

              <div className="ProductDetailsPage__characteristics">
                <div className="ProductDetailsPage__colors colors">
                  <div className="colors__text">Available colors</div>
                  <div className="colors__list">
                    {currentProductDetails?.colorsAvailable.map((color) => (
                      <Link
                        to={
                          pathname.replace(
                            currentProductDetails?.color,
                            color,
                          )
                        }
                        className={cn('colors__link', {
                          'colors__link-active':
                            color === currentProductDetails?.color,
                        })}
                        key={color}
                      >
                        <div
                          className={`colors__link-color colors__link-color--${color}`}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="ProductDetailsPage__capacities capacities">
                  <div className="capacities__text">Select capacity</div>
                  <div className="capacities__list">
                    {currentProductDetails?.capacityAvailable.map(
                      (capacity) => (
                        <Link
                          to={pathname.replace(
                            currentProductDetails?.capacity.toLowerCase(),
                            capacity.toLowerCase(),
                          )}
                          key={capacity}
                          type="button"
                          className={cn('capacities__link', {
                            'capacities__link-active':
                              capacity === currentProductDetails?.capacity,
                          })}
                        >
                          <span
                            className={cn('capacities__item', {
                              'capacities__item-active':
                                capacity === currentProductDetails?.capacity,
                            })}
                          >
                            {capacity}
                          </span>
                        </Link>
                      ),
                    )}
                  </div>
                </div>
                <div className="ProductDetailsPage__price price">
                  <div className="price__normal">{`$${currentProductDetails?.priceDiscount}`}</div>

                  {currentProduct && (
                    <div className="price__without-discount">{`$${currentProductDetails?.priceRegular}`}</div>
                  )}
                </div>
                <div className="ProductDetailsPage__buttons buttons">
                  <AddToCart
                    handleAddToCart={handleAddToCart}
                    id={productId}
                  />
                  <AddToFavourites
                    handleAddToFavourites={handleAddToFavourites}
                    isItemFavourite={isItemFavourite}
                  />
                </div>
                <div className="ProductDetailsPage__details details">
                  <div className="details__item">
                    <div className="details__name">Screen</div>
                    <div className="details__value">
                      {currentProductDetails?.screen || '-'}
                    </div>
                  </div>
                  <div className="details__item">
                    <div className="details__name">Resolution</div>
                    <div className="details__value">
                      {currentProductDetails?.resolution || '-'}
                    </div>
                  </div>
                  <div className="details__item">
                    <div className="details__name">Processor</div>
                    <div className="details__value">
                      {currentProductDetails?.processor || '-'}
                    </div>
                  </div>
                  <div className="details__item">
                    <div className="details__name">RAM</div>
                    <div className="details__value">
                      {currentProductDetails?.ram || '-'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ProductDetailsPage__id">
                <div className="ProductDetailsPage__id-name">ID:</div>
                <div className="ProductDetailsPage__id-value">
                  {currentProductDetails?.id || '-'}
                </div>
              </div>
            </div>

            <div className="ProductDetailsPage__info">
              <div
                className="ProductDetailsPage__about about"
                data-cy="productDescription"
              >
                <h2 className="about__title">About</h2>

                <div className="about__description">
                  {currentProductDetails?.description.join(' ')}
                </div>
              </div>

              <div className="ProductDetailsPage__tech tech">
                <h2 className="tech__title">Tech specs</h2>

                <div className="tech__details details">
                  <div className="details__item details__item--tech">
                    <div className="details__name">Screen</div>
                    <div className="details__value">
                      {currentProductDetails?.screen || '-'}
                    </div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">Resolution</div>
                    <div className="details__value">
                      {currentProductDetails?.resolution || '-'}
                    </div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">Processor</div>
                    <div className="details__value">
                      {currentProductDetails?.processor || '-'}
                    </div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">RAM</div>
                    <div className="details__value">
                      {currentProductDetails?.ram || '-'}
                    </div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">Built in memory</div>
                    <div className="details__value">
                      {currentProductDetails?.capacity || '-'}
                    </div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">Camera</div>
                    <div className="details__value">
                      {currentProductDetails?.camera.primary || '-'}
                    </div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">Zoom</div>
                    <div className="details__value">
                      {currentProductDetails?.zoom || '-'}
                    </div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">Wifi</div>
                    <div className="details__value">
                      {currentProductDetails.connectivity?.wifi || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="productCardPage__slider">
              <ProductSlider
                title="You may also like"
                products={suggestedProducts}
              />
            </div>
          </div>
        )}

        {!currentProductDetails && !isLoading && (
          <>
            <BackButton />
          </>
        )}
      </div>
    </div>
  );
};
