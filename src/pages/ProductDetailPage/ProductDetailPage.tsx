import {
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
import { calculateDiscount } from '../../helpers/calculateDiscount';
import { Button } from '../../components/Button/Button';
import { CartContext } from '../../context/CartContext';

export const ProductDetailPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { products } = useContext(ProductContext);
  const { cartItems, setCartItems } = useContext(CartContext);
  const { productId } = useParams();
  const product = products.find(item => item.id === productId);
  const [productDetails, setProductDetails] = useState<ProductDetails>(Object);
  const [activeImage, setActiveImage] = useState(0);
  const hasProductDetails = !!Object.values(productDetails).length && product;

  const {
    name,
    images,
    display,
    storage,
    description,
    connectivity,
    camera,
    android,
  } = productDetails;

  const isItemInCart = product && cartItems.some(
    item => item.id === product.id,
  );
  const isItemInFavourite = true;

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
      { id: product.id, quantity: 1, product },
    ];

    setCartItems(newCartItem);
    localStorage.setItem('cartItems', JSON.stringify(newCartItem));
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

  const priceWithDiscount = useMemo(() => {
    if (product) {
      return calculateDiscount(product);
    }

    return 0;
  }, [product]);

  return (
    <div className="ProductDetailPage section">
      {isLoading && (<Loader />)}

      {!isLoading && !hasError && !hasProductDetails && (
        <h1 className="ProductDetailPage__name">
          Product has no details
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
                  {`$${priceWithDiscount}`}
                </h1>

                {!!product.discount && (
                  <p className="ProductDetailPage__info--price--full-prize">
                    {`$${product.price}`}
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
                  favourite={isItemInFavourite ? 'added' : undefined}
                  className="ProductDetailPage__info--buttons--favourite"
                />
              </div>

              <div className="ProductDetailPage__info--specs-small Characters">
                <div className="Characters__row">
                  <p className="Characters__row--key">
                    Resolution
                  </p>
                  <p className="Characters__row--value">
                    {display.screenResolution || '-'}
                  </p>
                </div>

                <div className="Characters__row">
                  <p className="Characters__row--key">
                    Screen size
                  </p>
                  <p className="Characters__row--value">
                    {display.screenSize || '-'}
                  </p>
                </div>

                <div className="Characters__row">
                  <p className="Characters__row--key">
                    Capacity
                  </p>
                  <p className="Characters__row--value">
                    {storage.flash || '-'}
                  </p>
                </div>

                <div className="Characters__row">
                  <p className="Characters__row--key">
                    RAM
                  </p>
                  <p className="Characters__row--value">
                    {storage.ram || '-'}
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

              <p className="ProductDetailPage__about--description">
                {description}
              </p>
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
                    Screen size
                  </p>
                  <p className="Tech-specs__row--value">
                    {display.screenSize || '-'}
                  </p>
                </div>

                <div className="Tech-specs__row">
                  <p className="Tech-specs__row--key">
                    Resolution
                  </p>
                  <p className="Tech-specs__row--value">
                    {display.screenResolution || '-'}
                  </p>
                </div>

                <div className="Tech-specs__row">
                  <p className="Tech-specs__row--key">
                    Bluetooth
                  </p>
                  <p className="Tech-specs__row--value">
                    {connectivity.bluetooth || '-'}
                  </p>
                </div>

                <div className="Tech-specs__row">
                  <p className="Tech-specs__row--key">
                    Camera
                  </p>
                  <p className="Tech-specs__row--value">
                    {camera.primary || '-'}
                  </p>
                </div>

                <div className="Tech-specs__row">
                  <p className="Tech-specs__row--key">
                    Camera features
                  </p>
                  <p className="Tech-specs__row--value">
                    {camera.features.join(' + ') || '-'}
                  </p>
                </div>

                <div className="Tech-specs__row">
                  <p className="Tech-specs__row--key">
                    Capacity
                  </p>
                  <p className="Tech-specs__row--value">
                    {storage.flash || '-'}
                  </p>
                </div>

                <div className="Tech-specs__row">
                  <p className="Tech-specs__row--key">
                    RAM
                  </p>
                  <p className="Tech-specs__row--value">
                    {storage.ram || '-'}
                  </p>
                </div>

                <div className="Tech-specs__row">
                  <p className="Tech-specs__row--key">
                    OS
                  </p>
                  <p className="Tech-specs__row--value">
                    {android.os || '-'}
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
