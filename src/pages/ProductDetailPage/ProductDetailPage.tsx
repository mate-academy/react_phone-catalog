import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import './ProductDetailPage.scss';
import { BackButton } from '../../components/BackButton/BackButton';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import { ProductContext } from '../../context/ProductContext';
import { getProductDetails } from '../../features/API/apiSlice';
import { Loader } from '../../components/Loader/Loader';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { Button } from '../../components/Button/Button';
import { CartContext } from '../../context/CartContext';
import { FavouriteContext } from '../../context/FavouriteContext';

export const ProductDetailPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { products } = useContext(ProductContext);
  const { cartItems, setCartItems } = useContext(CartContext);
  const { favourites, setFavourites } = useContext(FavouriteContext);
  const { productId } = useParams();
  const product = products.find(item => item.itemId === productId);
  const [productDetails, setProductDetails] = useState<ProductDetails>(Object);
  const [activeImage, setActiveImage] = useState(0);
  const hasProductDetails = !!Object.values(productDetails).length && product;
  const isItemInFavourites = useMemo(() => {
    return product && favourites.some(item => item.itemId === product.itemId);
  }, [favourites]);

  const {
    name,
    images,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    processor,
    description,
    ram,
    capacity,
    camera,
    zoom,
    cell,
  } = productDetails;

  const isItemInCart = product && cartItems.some(
    item => item.itemId === product.itemId,
  );

  const getSuggestedProducts = (count: number) => {
    const generateIndex = () => Math.floor(Math.random() * products.length);
    const result: Product[] = [];

    for (let i = 0; i < count; i += 1) {
      let index = generateIndex();

      while (result.includes(products[index])) {
        index = generateIndex();
      }

      result.push(products[index]);
    }

    return result;
  };

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    const newCartItem = [
      ...cartItems,
      { itemId: product.itemId, quantity: 1, product },
    ];

    setCartItems(newCartItem);
    localStorage.setItem('cartItems', JSON.stringify(newCartItem));
  };

  const handleToFavourite = () => {
    if (!product) {
      return;
    }

    if (!isItemInFavourites) {
      const newFavourites = [...favourites, product];

      setFavourites(newFavourites);
      localStorage.setItem('favourites', JSON.stringify(newFavourites));
    } else {
      const newFavourites = [...favourites].filter(
        item => item.itemId !== product.itemId,
      );

      setFavourites(newFavourites);
      localStorage.setItem('favourites', JSON.stringify(newFavourites));
    }
  };

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    getProductDetails(productId)
      .then(data => {
        setProductDetails(data);
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

  return (
    <div className="ProductDetailPage section">
      {isLoading && (<Loader />)}

      {!isLoading && hasError && !hasProductDetails && (
        <h1 className="ProductDetailPage__error">
          Product was not found
        </h1>
      )}

      {!isLoading && !hasError && hasProductDetails && (
        <>
          <div className="ProductDetailPage__breadcrumb">
            <Breadcrumb />
          </div>

          <div className="ProductDetailPage__backButton">
            <BackButton />
          </div>

          <h1 className="ProductDetailPage__name">
            {name}
          </h1>

          <div className="ProductDetailPage__details">
            <div className="ProductDetailPage__images">
              <div className="ProductDetailPage__images--small-images">
                {images.map((url, index) => (
                  <button
                    type="button"
                    key={url}
                    className={cn(
                      'ProductDetailPage__images--small-images--wrapper',
                      // eslint-disable-next-line max-len
                      { 'ProductDetailPage__images--small-images--wrapper--active': index === activeImage },
                    )}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={url}
                      alt={name}
                      className="ProductDetailPage__images--small-images--image"
                    />
                  </button>
                ))}
              </div>

              <div className="ProductDetailPage__images--big-image-wrapper">
                <img
                  src={images[activeImage]}
                  alt={name}
                  className="ProductDetailPage__images--big-image"
                />
              </div>
            </div>

            <div className="ProductDetailPage__info">
              <div className="ProductDetailPage__info--price">
                <h1 className="ProductDetailPage__info--price--discount">
                  {`$${priceDiscount}`}
                </h1>

                {!!product.discount && (
                  <p className="ProductDetailPage__info--price--full-prize">
                    {`$${priceRegular}`}
                  </p>
                )}
              </div>

              <div className="ProductDetailPage__info--buttons">
                <Button
                  variant="cart"
                  card={isItemInCart ? 'added' : undefined}
                  className="ProductDetailPage__info--buttons--cart"
                  onClick={handleAddToCart}
                >
                  {isItemInCart
                    ? 'Added to cart'
                    : 'Add to cart'}
                </Button>

                <Button
                  variant="favourite"
                  favourite={isItemInFavourites ? 'added' : undefined}
                  className="ProductDetailPage__info--buttons--favourite"
                  onClick={handleToFavourite}
                  data-cy="addToFavorite"
                />
              </div>

              <div className="ProductDetailPage__info--specs-small Characters">
                <div className="Characters__row">
                  <p className="Characters__row--key">
                    Screen
                  </p>
                  <p className="Characters__row--value">
                    {screen || '-'}
                  </p>
                </div>

                <div className="Characters__row">
                  <p className="Characters__row--key">
                    Resolution
                  </p>
                  <p className="Characters__row--value">
                    {resolution || '-'}
                  </p>
                </div>

                <div className="Characters__row">
                  <p className="Characters__row--key">
                    Processor
                  </p>
                  <p className="Characters__row--value">
                    {processor || '-'}
                  </p>
                </div>

                <div className="Characters__row">
                  <p className="Characters__row--key">
                    RAM
                  </p>
                  <p className="Characters__row--value">
                    {ram || '-'}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="ProductDetailPage__about"
              data-cy="productDescription"
            >
              <h2 className="ProductDetailPage__about--title">
                About
              </h2>

              {description.map(desc => (
                <React.Fragment key={desc.title}>
                  <h3 className="ProductDetailPage__about--subtitle">
                    {desc.title}
                  </h3>
                  <p className="ProductDetailPage__about--description">
                    {desc.text.join('\n')}
                  </p>
                </React.Fragment>
              ))}

            </div>

            <div className="ProductDetailPage__tech-specs">
              <h2 className="ProductDetailPage__tech-specs--title">
                Tech specs
              </h2>

              <div
                className="ProductDetailPage__tech-specs--char Tech-specs"
              >
                <div className="Tech-specs__row">
                  <p className="Tech-specs__row--key">
                    Screen
                  </p>
                  <p className="Tech-specs__row--value">
                    {screen || '-'}
                  </p>
                </div>

                <div className="Tech-specs__row">
                  <p className="Tech-specs__row--key">
                    Resolution
                  </p>
                  <p className="Tech-specs__row--value">
                    {resolution || '-'}
                  </p>
                </div>

                <div className="Tech-specs__row">
                  <p className="Tech-specs__row--key">
                    Processor
                  </p>
                  <p className="Tech-specs__row--value">
                    {processor || '-'}
                  </p>
                </div>

                <div className="Tech-specs__row">
                  <p className="Tech-specs__row--key">
                    RAM
                  </p>
                  <p className="Tech-specs__row--value">
                    {ram || '-'}
                  </p>
                </div>

                <div className="Tech-specs__row">
                  <p className="Tech-specs__row--key">
                    Built in memory
                  </p>
                  <p className="Tech-specs__row--value">
                    {capacity}
                  </p>
                </div>

                <div className="Tech-specs__row">
                  <p className="Tech-specs__row--key">
                    Camera
                  </p>
                  <p className="Tech-specs__row--value">
                    {camera || '-'}
                  </p>
                </div>

                <div className="Tech-specs__row">
                  <p className="Tech-specs__row--key">
                    Zoom
                  </p>
                  <p className="Tech-specs__row--value">
                    {zoom || '-'}
                  </p>
                </div>

                <div className="Tech-specs__row">
                  <p className="Tech-specs__row--key">
                    Cell
                  </p>
                  <p className="Tech-specs__row--value">
                    {cell.join(' , ') || '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="ProductDetailPage__suggested">
        <ProductSlider
          products={getSuggestedProducts(10)}
          title="You may also like"
        />
      </div>
    </div>
  );
};
