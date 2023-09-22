import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { TailSpin } from 'react-loader-spinner';
import { ArrowLeft } from '../../assets/icons/ArrowLeft';
import { HomeIcon } from '../../assets/icons/home-icon';
import { ArrowRight } from '../../assets/icons/ArrowRight';
import { FavouritesIcon } from '../../assets/icons/favourites-icon';
import './ProductDetails.scss';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { Product, ProductDetail } from '../../types/Product';
import { getProductById, getProducts } from '../../api/api';
import {
  addToCart,
  getCart,
  removeFromCart,
} from '../../helpers/Cart';
import { useCartContext } from '../../context/cartContext';
import { useFavsContext } from '../../context/favouritesContext';
import {
  addToFavourites,
  getFavourites,
  removeFromFavourites,
} from '../../helpers/Favourites';
import { FavouritesLiked } from '../../assets/icons/favourites-icon-liked';
import { NoResults } from '../../components/NoResults/NoResults';
import { AboutAdaptive } from '../../components/AboutAdaptive/AboutAdaptive';
import { Specs } from '../../components/Specs/Specs';
import { DetailsCard } from '../../components/DetailsCard/DetailsCard';

export const ProductDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);

  const { itemId } = useParams();
  const { setAddedToCart } = useCartContext();
  const { setAddedToFavs } = useFavsContext();

  const navigate = useNavigate();
  const isTablet = useMediaQuery({ maxWidth: 800 });

  const handleBackClick = () => {
    navigate(-1);
  };

  const newColorUrl = itemId?.split('-').slice(0, -1).join('-');
  const newCapacityUrl = useCallback((capacity: string) => (
    itemId?.split('-').map(item => (
      item.includes('gb')
        ? capacity.toLowerCase()
        : item
    )).join('-')
  ), [itemId]);

  const updateIsAddedState = () => {
    const updatedCart = getCart();
    const updatedIsAdded = updatedCart.some(item => (
      item.product.id === currentProduct?.id
    ));

    setIsAdded(updatedIsAdded);

    if (updatedIsAdded) {
      localStorage.setItem(`isAdded_${currentProduct?.id}`, 'true');
    } else {
      localStorage.removeItem(`isAdded_${currentProduct?.id}`);
    }
  };

  const updateIsAddedToFavs = () => {
    const updatedFavs = getFavourites();
    const updatedIsAddedToFavs = updatedFavs.some(item => (
      item.id === currentProduct?.id
    ));

    setIsAddedToFav(updatedIsAddedToFavs);

    if (updatedIsAddedToFavs) {
      localStorage.setItem(`isAddedToFavs_${currentProduct?.id}`, 'true');
    } else {
      localStorage.removeItem(`isAddedToFavs_${currentProduct?.id}`);
    }
  };

  const getProductsFromServer = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const fetchedProducts = await getProducts();
      const current = fetchedProducts.find(item => item.itemId === itemId);

      setProducts(fetchedProducts);

      if (current) {
        setCurrentProduct(current);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getProductFromServer = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      if (itemId) {
        const fetchedProduct = await getProductById(itemId);

        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct.images[0]);
      }
    } catch (error) {
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectImage = (image: string) => {
    setSelectedImage(image);
  };

  const handleAddToCart = () => {
    if (!currentProduct) {
      return;
    }

    const productToAdd = {
      product: currentProduct,
      quantity: 1,
    };

    if (isAdded) {
      removeFromCart(productToAdd);
      setAddedToCart(prev => prev - 1);
    } else {
      addToCart(productToAdd);
      setAddedToCart(prev => prev + 1);
    }

    const updatedCart = getCart();
    const updatedIsAdded = updatedCart.some(item => (
      item.product.id === currentProduct.id
    ));

    setIsAdded(updatedIsAdded);
    updateIsAddedState();
  };

  const handleAddToFavourites = () => {
    if (!currentProduct) {
      return;
    }

    if (isAddedToFav) {
      removeFromFavourites(currentProduct);
      setAddedToFavs(prev => prev - 1);
    } else {
      addToFavourites(currentProduct);
      setAddedToFavs(prev => prev + 1);
    }

    const updatedFavs = getFavourites();
    const updatedIsAddedToFavs = updatedFavs.some(item => (
      item.id === currentProduct?.id
    ));

    setIsAddedToFav(updatedIsAddedToFavs);
    updateIsAddedToFavs();
  };

  useEffect(() => {
    getProductFromServer();
  }, [itemId]);

  useEffect(() => {
    getProductsFromServer();

    const storedIsAdded = localStorage.getItem(`isAdded_${currentProduct?.id}`);

    if (storedIsAdded) {
      setIsAdded(storedIsAdded === 'true');
    }
  }, []);

  useEffect(() => {
    updateIsAddedState();
    updateIsAddedToFavs();
  }, [itemId]);

  if (notFound) {
    return (
      <NoResults title="Phone" />
    );
  }

  return (
    <section className="details">
      {!isLoading ? (
        <>
          <div
            className="details__nav"
            data-cy="breadCrumbs"
          >
            <div className="details__navtop">
              <Link
                to="/"
                className=""
              >
                <HomeIcon />
              </Link>
              <ArrowRight />
              <Link
                to="/phones"
                className="navlink"
              >
                Phones
              </Link>
              <ArrowRight />
              <div className="details__navname">
                {product?.name}
              </div>
            </div>

            <div data-cy="backButton" className="details__navback">
              <label
                htmlFor="detailsBackButton"
                className="details__navback__icon"
              >
                <button
                  type="button"
                  id="detailsBackButton"
                  onClick={handleBackClick}
                >
                  <ArrowLeft />
                </button>
                <div className="details__navtext">
                  Back
                </div>
              </label>
            </div>
          </div>

          <div className="details__title">
            {product?.name}
          </div>

          {isTablet ? (
            <div className="details__card">
              <DetailsCard
                product={product}
                isAdded={isAdded}
                isAddedToFav={isAddedToFav}
                handleAddToCart={handleAddToCart}
                handleAddToFavourites={handleAddToFavourites}
                itemId={itemId}
                newColorUrl={newColorUrl}
                newCapacityUrl={newCapacityUrl}
                selectedImage={selectedImage}
                handleSelectImage={handleSelectImage}
              />
            </div>
          ) : (
            <>
              <div className="imgcontainer">
                <div className="details__simages_container">
                  {product?.images.map(image => (
                    <button
                      type="button"
                      className="simage__container"
                      onClick={() => handleSelectImage(image)}
                      key={image}
                    >
                      <img
                        src={`new/${image}`}
                        alt={product.name}
                        className="simage"
                      />
                    </button>

                  ))}
                </div>

                <div className="details__xlimage_container">
                  <img
                    src={`new/${selectedImage}`}
                    alt="img"
                    className="xlimage"
                  />
                </div>

                <div className="details__features_container">
                  <div className="colors">
                    <div className="colors__text">
                      Available colors
                    </div>
                    <div className="colors__choose">
                      {product?.colorsAvailable.map(color => (
                        <Link
                          key={color}
                          to={`/${newColorUrl}-${color}`}
                          className={classNames('colors__color', {
                            colors__color__selected: product.color === color,
                          })}
                        >
                          <div className={`colored ${color}`} />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="capacities">
                    <div className="capacities__text">
                      Select capacity
                    </div>
                    <div className="colors__choose">
                      {product?.capacityAvailable.map(capacity => (
                        <Link
                          to={`/${newCapacityUrl(capacity)}`}
                          key={capacity}
                          className={classNames('capacities__capacity', {
                            capacities__capacity__selected: itemId
                              ?.includes(capacity.toLowerCase()),
                          })}
                        >
                          {capacity}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="details__price">
                    <div className="details__price__main">
                      {`$${product?.priceDiscount}`}
                    </div>
                    <div className="details__price__sale">
                      {`$${product?.priceRegular}`}
                    </div>
                  </div>

                  <div className="details__buy">
                    {isAdded
                      ? (
                        <button
                          className="details__cart_active"
                          type="button"
                          onClick={handleAddToCart}
                        >
                          Added to cart
                        </button>
                      ) : (
                        <button
                          className="details__cart"
                          type="button"
                          onClick={handleAddToCart}
                        >
                          Add to cart
                        </button>
                      )}
                    <div className="details__favourites">
                      <button
                        className="details__favourites"
                        type="button"
                        onClick={handleAddToFavourites}
                      >
                        {isAddedToFav
                          ? <FavouritesLiked />
                          : <FavouritesIcon />}

                      </button>
                    </div>
                  </div>

                  <div className="details__info">
                    <div className="details__info__item">
                      <h2 className="details__info__key">Screen</h2>
                      <h3
                        className="details__info__value"
                      >
                        {product?.screen}
                      </h3>
                    </div>

                    <div className="details__info__item">
                      <h2
                        className="details__info__key"
                      >
                        Resolution
                      </h2>
                      <h3
                        className="details__info__value"
                      >
                        {product?.resolution}
                      </h3>
                    </div>

                    <div className="details__info__item">
                      <h2 className="details__info__key">
                        Processor
                      </h2>
                      <h3
                        className="details__info__value"
                      >
                        {product?.processor}
                      </h3>
                    </div>

                    <div className="details__info__item">
                      <h2 className="details__info__key">
                        RAM
                      </h2>
                      <h3
                        className="details__info__value"
                      >
                        {product?.ram}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div
            className="details__information"
            data-cy="productDescription"
          >
            {isTablet ? (
              <div className="details__information__about">
                <AboutAdaptive
                  title="About"
                  product={product}
                />
              </div>
            ) : (
              <div className="details__information__about">
                <div className="details__information__about__title">
                  About
                </div>
                {product?.description.map(item => (
                  <>
                    <div
                      key={item.title}
                      className="details__information__about__subtitle"
                    >
                      {item.title}
                    </div>
                    <div
                      className="details__information__about__text"
                    >
                      {item.text}
                    </div>
                  </>
                ))}
              </div>
            )}

            {isTablet ? (
              <div className="details__information__specs">
                <Specs
                  title="Tech specs"
                  product={product}
                />
              </div>
            ) : (
              <>
                <div className="details__information__specs">
                  <div className="details__information__specs__title">
                    Tech specs
                  </div>
                  <div className="details__information__specs__info">
                    <div className="details__information__specs__item">
                      <h2
                        className="details__information__specs__key"
                      >
                        Screen
                      </h2>
                      <h3
                        className="details__information__specs__value"
                      >
                        {product?.screen}
                      </h3>
                    </div>

                    <div className="details__information__specs__item">
                      <h2
                        className="details__information__specs__key"
                      >
                        Resolution
                      </h2>
                      <h3
                        className="details__information__specs__value"
                      >
                        {product?.resolution}
                      </h3>
                    </div>

                    <div className="details__information__specs__item">
                      <h2
                        className="details__information__specs__key"
                      >
                        Processor
                      </h2>
                      <h3
                        className="details__information__specs__value"
                      >
                        {product?.processor}
                      </h3>
                    </div>

                    <div className="details__information__specs__item">
                      <h2
                        className="details__information__specs__key"
                      >
                        RAM
                      </h2>
                      <h3
                        className="details__information__specs__value"
                      >
                        {product?.ram}
                      </h3>
                    </div>

                    <div className="details__information__specs__item">
                      <h2
                        className="details__information__specs__key"
                      >
                        Built in memory
                      </h2>
                      <h3
                        className="details__information__specs__value"
                      >
                        {product?.capacity}
                      </h3>
                    </div>

                    <div className="details__information__specs__item">
                      <h2
                        className="details__information__specs__key"
                      >
                        Camera
                      </h2>
                      <h3
                        className="details__information__specs__value"
                      >
                        {product?.camera}
                      </h3>
                    </div>

                    <div className="details__information__specs__item">
                      <h2
                        className="details__information__specs__key"
                      >
                        Zoom
                      </h2>
                      <h3
                        className="details__information__specs__value"
                      >
                        {product?.zoom}
                      </h3>
                    </div>

                    <div className="details__information__specs__item">
                      <h2
                        className="details__information__specs__key"
                      >
                        Cell
                      </h2>
                      <h3
                        className="details__information__specs__value"
                      >
                        {product?.cell.join(' ')}
                      </h3>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <ProductSlider products={products} title="You may also like" />
        </>
      ) : (
        <TailSpin
          height="80"
          width="80"
          color="#313237"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperClass="spincontainer"
          visible
        />
      )}
    </section>
  );
};
