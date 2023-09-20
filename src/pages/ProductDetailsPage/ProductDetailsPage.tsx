/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';
import { RotatingLines } from 'react-loader-spinner';

import { FavContext } from '../../providers/FavProvider/FavProvider';

import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { BackButton } from '../../components/BackButton/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { CartContext } from '../../providers/CartProvider/CartProvider';
import { AddToCartButton }
  from '../../components/AddToCartButton/AddToCartButton';
import { AddToFavButton } from '../../components/AddToFavButton/AddToFavButton';
import { NoResults } from '../../components/NoResults/NoResults';

import { Product } from '../../types/Product';

import './ProductDetailsPage.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { getProduct } from '../../api/products';

type Props = {
  products: Product[];
};

export const ProductDetailsPage: React.FC<Props> = ({ products }) => {
  const location = useLocation();
  const { pathname } = location;
  const propsData: ProductDetails = location.state;
  const { productId = '' } = useParams();

  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [currentProductWithDetails, setCurrentProductWithDetails]
    = useState<ProductDetails>();
  const [currentImage, setCurrentImage] = useState(currentProduct?.image);
  const [isLoading, setIsLoading] = useState(true);

  const { productsInCart, setProductsInCart } = useContext(CartContext);
  const { favoriteProducts, setFavoriteProducts } = useContext(FavContext);

  const getCurrentProduct = async () => {
    setIsLoading(true);

    try {
      const details = await getProduct(productId);
      const prod = products.find((product) => product.phoneId === productId);

      if (productId === details.id) {
        setCurrentProduct(prod);
        setCurrentProductWithDetails(details);
      }
    } catch (error) {
      throw new Error('ERROR IN ProductDetailsPage');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentProduct();
  }, [productId]);

  useEffect(() => {
    if (currentProductWithDetails?.images[0] !== currentImage) {
      setCurrentImage(currentProductWithDetails?.images[0]);
    }
  }, [currentProductWithDetails?.images]);

  const isItemInCart = productsInCart.some(
    (cartItem) => cartItem.phoneId === currentProductWithDetails?.id,
  );

  const handleAddToCart = () => {
    if (isItemInCart) {
      const updatedCart = productsInCart.filter(
        (cartItem) => cartItem.phoneId !== currentProductWithDetails?.id,
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

  const isItemFav = favoriteProducts.some(
    (favProd) => favProd.phoneId === currentProductWithDetails?.id,
  );

  const handleAddToFavorites = () => {
    if (isItemFav) {
      const updatedFavorites = favoriteProducts.filter(
        (favProd) => favProd.phoneId !== currentProductWithDetails?.id,
      );

      setFavoriteProducts(updatedFavorites);

      return;
    }

    if (currentProduct) {
      setFavoriteProducts([...favoriteProducts, currentProduct]);
    }
  };

  const suggestedProducts = useMemo(() => {
    const shuffledProducts = [...products].sort(() => Math.random() - 0.5);

    return shuffledProducts.filter((prod) => prod.id !== currentProduct?.id);
  }, [products, currentProduct]);

  return (
    <div className="ProductDetailsPage">
      <div className="container">
        {currentProductWithDetails && !isLoading ? (
          <div className="ProductDetailsPage__content">
            <Breadcrumbs />

            <BackButton />

            <h1 className="ProductDetailsPage__title">
              {currentProductWithDetails?.name}
            </h1>

            <div className="ProductDetailsPage__main">
              <ul className="ProductDetailsPage__list">
                {currentProductWithDetails?.images.map((image) => (
                  <li
                    key={image}
                    className="ProductDetailsPage__photo"
                    onClick={() => setCurrentImage(image)}
                  >
                    <img
                      className="ProductDetailsPage__photo-img"
                      src={image}
                      alt="product img"
                    />
                  </li>
                ))}
              </ul>

              <div className="ProductDetailsPage__current">
                <img
                  src={currentImage}
                  alt="main img"
                  className="ProductDetailsPage__current-img"
                />
              </div>

              <div className="ProductDetailsPage__characteristics">
                <div className="ProductDetailsPage__colors colors">
                  <div className="colors__text">Available colors</div>
                  <div className="colors__list">
                    {currentProductWithDetails?.colorsAvailable.map((color) => (
                      <Link
                        to={
                          pathname.replace(
                            currentProductWithDetails?.color,
                            color,
                          )
                        }
                        className={cn('colors__link', {
                          'colors__link-active':
                            color === currentProductWithDetails?.color,
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
                    {currentProductWithDetails?.capacityAvailable.map(
                      (capacity) => (
                        <Link
                          to={pathname.replace(
                            currentProductWithDetails?.capacity.toLowerCase(),
                            capacity.toLowerCase(),
                          )}
                          key={capacity}
                          type="button"
                          className={cn('capacities__link', {
                            'capacities__link-active':
                              capacity === currentProductWithDetails?.capacity,
                          })}
                        >
                          {capacity}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
                <div className="ProductDetailsPage__price price">
                  <div className="price__normal">{`$${currentProductWithDetails?.priceDiscount}`}</div>

                  {currentProduct && (
                    <div className="price__without-discount">{`$${currentProductWithDetails?.priceRegular}`}</div>
                  )}
                </div>
                <div className="ProductDetailsPage__buttons buttons">
                  <AddToCartButton
                    handleAddToCart={handleAddToCart}
                    id={productId}
                  />
                  <AddToFavButton
                    handleAddToFavorites={handleAddToFavorites}
                    isItemFav={isItemFav}
                  />
                </div>
                <div className="ProductDetailsPage__details details">
                  <div className="details__item">
                    <div className="details__name">Screen</div>
                    <div className="details__value">
                      {currentProductWithDetails.screen || '-'}
                    </div>
                  </div>
                  <div className="details__item">
                    <div className="details__name">Resolution</div>
                    <div className="details__value">
                      {currentProductWithDetails.resolution || '-'}
                    </div>
                  </div>
                  <div className="details__item">
                    <div className="details__name">Processor</div>
                    <div className="details__value">
                      {currentProductWithDetails.processor || '-'}
                    </div>
                  </div>
                  <div className="details__item">
                    <div className="details__name">RAM</div>
                    <div className="details__value">
                      {currentProductWithDetails.ram || '-'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ProductDetailsPage__id">
                <div className="ProductDetailsPage__id-name">ID:</div>
                <div className="ProductDetailsPage__id-value">
                  {currentProductWithDetails.id || '-'}
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
                  {currentProductWithDetails.description.map(
                    ({ text }) => text,
                  )}
                </div>
              </div>

              <div className="ProductDetailsPage__tech tech">
                <h2 className="tech__title">Tech specs</h2>

                <div className="tech__details details">
                  <div className="details__item details__item--tech">
                    <div className="details__name">Screen</div>
                    <div className="details__value">
                      {currentProductWithDetails.screen || '-'}
                    </div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">Resolution</div>
                    <div className="details__value">
                      {currentProductWithDetails.resolution || '-'}
                    </div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">Processor</div>
                    <div className="details__value">
                      {currentProductWithDetails.processor || '-'}
                    </div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">RAM</div>
                    <div className="details__value">
                      {currentProductWithDetails.ram || '-'}
                    </div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">Built in memory</div>
                    <div className="details__value">
                      {currentProductWithDetails.capacity || '-'}
                    </div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">Camera</div>
                    <div className="details__value">
                      {currentProductWithDetails.camera || '-'}
                    </div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">Zoom</div>
                    <div className="details__value">
                      {currentProductWithDetails.zoom || '-'}
                    </div>
                  </div>
                  <div className="details__item details__item--tech">
                    <div className="details__name">Wifi</div>
                    <div className="details__value">
                      {currentProductWithDetails.cell || '-'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ProductsSlider
              title="You may also like"
              products={suggestedProducts}
              key={propsData?.id}
            />
          </div>
        ) : (
          <div className="ProductDetailsPage__loading">
            <RotatingLines
              strokeColor="#EB5757"
              strokeWidth="5"
              animationDuration="0.75"
              width="77"
              visible={isLoading}
            />
          </div>
        )}

        {!currentProductWithDetails && !propsData && !isLoading && (
          <>
            <BackButton />
            <NoResults category="Product" />
          </>
        )}
      </div>
    </div>
  );
};
