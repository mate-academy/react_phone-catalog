import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails } from '../../api';
import './ProductDetailsPage.scss';
import { GlobalContext } from '../../components/Context/Context';
import { ProductSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Loader } from '../../components/Loader/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Color, Colors } from '../../types/Colors';
import { NoResults } from '../../components/NoResults/NoResults';

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState<ProductDetails>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { productId } = useParams<{ productId: string }>();
  const [currentImage, setCurrentImage] = useState('');
  const location = useLocation();
  const { products, cartProducts, favorites, addToCart, addToFavorites } =
    useContext(GlobalContext);

  const getSuggestedProducts = products.sort(() => 0.5 - Math.random());
  const cartItem = products.find(item => item.itemId === productId);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getProductDetails(productId, cartItem?.category)
      .then(response => {
        if (response) {
          setProduct(response);
          setCurrentImage(response.images[0]);
        }
      })
      .catch(() => setError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, [cartItem?.category, productId]);

  return (
    <div className="details">
      <div className="container">
        {isLoading && <Loader />}

        {error && (
          <div className="details__no-result">
            <NoResults
              message="Product was not found"
              description="Please check again later"
            />
            <img
              src="img/product-not-found.png"
              alt="product not found"
              className="details__not-found"
            />
          </div>
        )}

        {!isLoading && !error && product && (
          <div className="details__content">
            <div className="details__breadcrumbs">
              <Breadcrumbs
                category={cartItem ? cartItem.category : 'phones'}
                product={product?.name}
              />
            </div>

            <Link to=".." className="details__button-back" data-cy="backButton">
              <div className="details__arrow" />
              Back
            </Link>

            <h1 className="details__title title--h2">{product?.name}</h1>

            <div className="details__photos">
              <div className="details__images">
                {product?.images.map(image => (
                  <button
                    key={image}
                    type="button"
                    className={cn('details__button', {
                      'details__button--active': currentImage === image,
                    })}
                    onClick={() => setCurrentImage(image)}
                  >
                    <img alt="product" src={image} className="details__image" />
                  </button>
                ))}
              </div>
              <div className="details__current-image-container">
                <img
                  alt="product"
                  src={currentImage}
                  className="details__current-image"
                />
              </div>
            </div>

            <div className="details__right-side">
              <div className="details__actions">
                <div className="details__action">
                  <p className="details__property">Available colors</p>
                  <div className="details__colors">
                    {product?.colorsAvailable.map(color => (
                      <div
                        key={color}
                        className={cn('details__color-item', {
                          'details__color-item--active':
                            color === product.color,
                        })}
                      >
                        <Link
                          to={{
                            pathname: location.pathname.replace(
                              product.color,
                              color,
                            ),
                          }}
                          style={{ backgroundColor: Colors[color as Color] }}
                          className="details__color"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="details__action">
                  <p className="details__property">Select capacity</p>
                  <div className="details__capacities">
                    {product?.capacityAvailable.map(capacity => (
                      <div key={capacity} className="details__capacity-item">
                        <Link
                          to={{
                            pathname: location.pathname.replace(
                              product.capacity.toLowerCase(),
                              capacity.toLowerCase(),
                            ),
                          }}
                          className={cn('details__capacity', {
                            'details__capacity--active':
                              capacity === product.capacity,
                          })}
                        >
                          {capacity}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="details__prices">
                <div className="details__discount">
                  {`$${product?.priceDiscount}`}
                </div>
                <div className="details__full-price">
                  {`$${product?.priceRegular}`}
                </div>
              </div>

              <div className="details__buttons">
                <button
                  type="button"
                  onClick={() => cartItem && addToCart(cartItem)}
                  className={
                    cartProducts.some(item => item.itemId === productId)
                      ? 'details__add-button-active'
                      : 'details__add-button'
                  }
                >
                  {cartProducts.some(item => item.itemId === productId)
                    ? 'Added to cart'
                    : 'Add to cart'}
                </button>
                <button
                  onClick={() => cartItem && addToFavorites(cartItem)}
                  type="button"
                  aria-label="favourites"
                  className={`details__favourites ${
                    favorites.some(item => item.itemId === productId)
                      ? 'icon--favourites-active'
                      : 'icon--favourites'
                  }`}
                />
              </div>

              <div className="details__description">
                <div className="details__info">
                  <div className="details__category">Screen</div>
                  <div className="details__value">{product?.screen}</div>
                </div>
                <div className="details__info">
                  <div className="details__category">Resolution</div>
                  <div className="details__value">{product?.resolution}</div>
                </div>
                <div className="details__info">
                  <div className="details__category">Processor</div>
                  <div className="details__value">{product?.processor}</div>
                </div>
                <div className="details__info">
                  <div className="details__category">RAM</div>
                  <div className="details__value">{product?.ram}</div>
                </div>
              </div>
            </div>

            <div className="details__about" data-cy="productDescription">
              <h2 className="details__title-h2 title--h3">About</h2>
              {product?.description.map(info => (
                <div className="details__about-section" key={info.title}>
                  <h3 className="details__title-h3 title--h4">{info.title}</h3>
                  <p className="details__text">{info.text}</p>
                </div>
              ))}
            </div>

            <div className="details__tech">
              <h2 className="details__title-h2 title--h3">Tech specs</h2>
              <div className="details__description">
                <div className="details__info">
                  <div className="details__category--tech">Screen</div>
                  <div className="details__value--tech">{product?.screen}</div>
                </div>
                <div className="details__info">
                  <div className="details__category--tech">Resolution</div>
                  <div className="details__value--tech">
                    {product?.resolution}
                  </div>
                </div>
                <div className="details__info">
                  <div className="details__category--tech">Processor</div>
                  <div className="details__value--tech">
                    {product?.processor}
                  </div>
                </div>
                <div className="details__info">
                  <div className="details__category--tech">RAM</div>
                  <div className="details__value--tech">{product?.ram}</div>
                </div>
                <div className="details__info">
                  <div className="details__category--tech">Built in memory</div>
                  <div className="details__value--tech">
                    {product?.capacity}
                  </div>
                </div>
                <div className="details__info">
                  <div className="details__category--tech">Camera</div>
                  <div className="details__value--tech">{product?.camera}</div>
                </div>
                <div className="details__info">
                  <div className="details__category--tech">Zoom</div>
                  <div className="details__value--tech">{product?.zoom}</div>
                </div>
                <div className="details__info">
                  <div className="details__category--tech">Cell</div>
                  <div className="details__value--tech">
                    {product?.cell.join(', ')}
                  </div>
                </div>
              </div>
            </div>

            <div className="details__suggestions">
              <ProductSlider
                title="You may also like"
                products={getSuggestedProducts}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
