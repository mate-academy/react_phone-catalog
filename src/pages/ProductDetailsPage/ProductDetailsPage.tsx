import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';

import heart from '../../images/icons/heart_like.svg';
import heartFilled from '../../images/icons/favourites-filled.svg';
import home from '../../images/icons/Home.svg';
import arrow from '../../images/icons/disable_arrow.png';

import './ProductDetailsPage.scss';
import { getProductByID, getProducts } from '../../api/products';
import { PhoneDetails } from '../../types/PhoneDetails';
import { YouMayAlsoLike } from '../../components/YouMayAlsoLike/YouMayAlsoLike';
import { Product } from '../../types/Product';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const { pathname } = useLocation();

  const [currentProduct, setCurrentProduct] = useState<PhoneDetails>();
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const handleSetCurrentImage = (image: string) => {
    setCurrentImage(image);
  };

  const handleAddToCart = async () => {
    const cartItems: Product[] = JSON
      .parse(localStorage.getItem('CartItems') || '[]');

    const tempProduct = (await getProducts())
      .find(product => product.phoneId === currentProduct?.id);

    const index = cartItems
      .findIndex((cartItem) => cartItem.id === tempProduct?.id);

    if (index === -1 && tempProduct) {
      cartItems.push(tempProduct);
    } else {
      cartItems.splice(index, 1);
    }

    localStorage.setItem('CartItems', JSON.stringify(cartItems));
    setIsInCart(!isInCart);
  };

  const handleAddToFavorite = async () => {
    const newLikedStatus = !isLiked;

    setIsLiked(newLikedStatus);

    let likedProducts: Product[] = JSON
      .parse(localStorage.getItem('LikedProducts') || '[]');

    const tempProduct = (await getProducts())
      .find(product => product.phoneId === currentProduct?.id);

    const index = likedProducts
      .findIndex((likedProduct) => likedProduct.id === tempProduct?.id);

    if (newLikedStatus && index === -1 && tempProduct) {
      likedProducts.push(tempProduct);
    } else if (!newLikedStatus && index !== -1) {
      likedProducts = likedProducts
        .filter((likedProduct) => likedProduct.id !== tempProduct?.id);
    }

    localStorage.setItem('LikedProducts', JSON.stringify(likedProducts));

    window.dispatchEvent(new Event('storage'));
  };

  useEffect(() => {
    if (productId) {
      getProductByID(productId)
        .then(product => {
          setCurrentProduct(product);
          setCurrentImage(product.images[0]);
          const likedProducts: Product[] = JSON
            .parse(localStorage.getItem('LikedProducts') || '[]');

          const like = likedProducts
            .some(likedProduct => likedProduct.phoneId === product.id);

          setIsLiked(like);

          const cardProducts: Product[] = JSON
            .parse(localStorage.getItem('CartItems') || '[]');

          const cart = cardProducts
            .some(cartProduct => cartProduct.phoneId === product.id);

          setIsInCart(cart);
        })
        .finally(() => setIsLoading(false));
    }
  }, [productId]);

  return (
    <div className="productDetails">
      <div className="productDetails__header">
        <Link to="/">
          <img
            src={home}
            alt="home"
            className="productDetails__icons"
          />
        </Link>
        <img
          src={arrow}
          alt="arrow"
          className="productDetails__icons"
        />
        <Link to="/phones" className="productDetails__currentPage">Phones</Link>
        <img
          src={arrow}
          alt="arrow"
          className="productDetails__icons"
        />
        <p className="productDetails__currentPage">{currentProduct?.name}</p>
      </div>
      <div className="productDetails__back">
        <img
          src={arrow}
          alt="arrow"
          className="productDetails__icons-left"
        />
        <Link to="/phones" className="productDetails__currentPage">Back</Link>
      </div>
      <p className="productDetails__title">{currentProduct?.name}</p>
      <div className="productDetails__phoneOptions">
        <div className="productDetails__list">
          <ul className="productDetails__imagesList">
            {currentProduct?.images.map(image => (
              <li
                key={image}
                className={cn('productDetails__listItem',
                  {
                    'productDetails__listItem-selected': currentImage === image,
                  })}
              >
                <Link
                  to={{ pathname }}
                  className="productDetails__link"
                  onClick={() => handleSetCurrentImage(image)}
                >
                  <img
                    src={`_new/${image}`}
                    alt={image}
                    className="productDetails__image"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <img
          src={`_new/${currentImage}`}
          alt={currentImage}
          className="productDetails__currentImage"
        />

        <div className="productDetails__options">
          <div className="productDetails__colors">
            <p className="productDetails__options-title">Available colors</p>
            <div className="productDetails__availableColors">
              {currentProduct?.colorsAvailable.map(color => (
                <Link
                  to={`../${currentProduct.id.replace(currentProduct.color.toLowerCase(), color.toLowerCase())}`}
                  className="productDetails__color"
                >
                  <span
                    className={cn('productDetails__circle', {
                      'productDetails__circle-selected': color
                        .toLowerCase() === currentProduct.color.toLowerCase(),
                    })}
                    style={{
                      backgroundColor: color.toString(),
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="productDetails__colors">
            <p className="productDetails__options-title">Select capacity</p>

            <div className="productDetails__availableCapacity">
              {currentProduct?.capacityAvailable.map(capacity => (
                <Link
                  to={`../${currentProduct.id.replace(currentProduct.capacity.toLocaleLowerCase(), capacity.toLowerCase())}`}
                  className={cn('productDetails__capacityItem',
                    {
                      'productDetails__capacityItem-selected':
                        currentProduct.capacity === capacity,
                    })}
                >
                  {capacity}
                </Link>
              ))}
            </div>
          </div>

          <div className="productDetails__price">
            <div className="productDetails__prices">
              <p
                className="productDetails__prices-currentPrice"
              >
                {`$${currentProduct?.priceDiscount}`}
              </p>
              <p
                className="productDetails__prices-oldPrice"
              >
                {`$${currentProduct?.priceRegular}`}
              </p>
            </div>

            <div className="productDetails__pricesButtons">
              <button
                type="button"
                className={cn('productDetails__pricesButtons-add-to-cart',
                  {
                    'productDetails__pricesButtons-add-to-cart-in-cart':
                      isInCart,
                  })}
                onClick={handleAddToCart}
              >
                {isInCart ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
                type="button"
                className="productDetails__favorite"
                onClick={handleAddToFavorite}
              >
                {isLiked ? (
                  <img
                    src={heartFilled}
                    alt="favorite_heart"
                    className="productDetails__icon"
                  />
                ) : (
                  <img
                    src={heart}
                    alt="favorite_heart"
                    className="productDetails__icon"
                  />
                )}
              </button>
            </div>
          </div>

          <div className="productDetails__optionDetails">
            <div className="productDetails__optionDetails-item">
              <p className="productDetails__optionDetails-item-title">Screen</p>
              <p
                className="productDetails__optionDetails-item-text"
              >
                {currentProduct?.screen}
              </p>
            </div>
            <div className="productDetails__optionDetails-item">
              <p
                className="productDetails__optionDetails-item-title"
              >
                Resolution
              </p>
              <p
                className="productDetails__optionDetails-item-text"
              >
                {currentProduct?.resolution}
              </p>
            </div>
            <div className="productDetails__optionDetails-item">
              <p
                className="productDetails__optionDetails-item-title"
              >
                Processor
              </p>
              <p
                className="productDetails__optionDetails-item-text"
              >
                {currentProduct?.processor}
              </p>
            </div>
            <div className="productDetails__optionDetails-item">
              <p
                className="productDetails__optionDetails-item-title"
              >
                RAM
              </p>
              <p
                className="productDetails__optionDetails-item-text"
              >
                {currentProduct?.ram}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section
        className="productDetails__aboutSection"
        data-cy="productDescription"
      >
        <div className="productDetails__about">
          <h2 className="productDetails__aboutSectionTitle">About</h2>
          {currentProduct?.description.map(item => (
            <div className="productDetails__description">
              <h3 className="productDetails__aboutTitle">{item.title}</h3>
              <p className="productDetails__aboutText">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="productDetails__techSpecs">
          <h2 className="productDetails__aboutSectionTitle">Tech specs</h2>
          <div className="productDetails__specsList">
            <div className="productDetails__specsDetails">
              <p className="productDetails__specsTitle">Screen</p>
              <p
                className="productDetails__specsInfo"
              >
                {currentProduct?.screen}
              </p>
            </div>
            <div className="productDetails__specsDetails">
              <p className="productDetails__specsTitle">Resolution</p>
              <p
                className="productDetails__specsInfo"
              >
                {currentProduct?.resolution}
              </p>
            </div>
            <div className="productDetails__specsDetails">
              <p className="productDetails__specsTitle">Processor</p>
              <p
                className="productDetails__specsInfo"
              >
                {currentProduct?.processor}
              </p>
            </div>
            <div className="productDetails__specsDetails">
              <p className="productDetails__specsTitle">RAM</p>
              <p className="productDetails__specsInfo">{currentProduct?.ram}</p>
            </div>
            <div className="productDetails__specsDetails">
              <p className="productDetails__specsTitle">Built in memory</p>
              <p
                className="productDetails__specsInfo"
              >
                {currentProduct?.capacity}
              </p>
            </div>
            <div className="productDetails__specsDetails">
              <p className="productDetails__specsTitle">Camera</p>
              <p
                className="productDetails__specsInfo"
              >
                {currentProduct?.camera}
              </p>
            </div>
            <div className="productDetails__specsDetails">
              <p className="productDetails__specsTitle">Zoom</p>
              <p
                className="productDetails__specsInfo"
              >
                {currentProduct?.zoom}
              </p>
            </div>
            <div className="productDetails__specsDetails">
              <p className="productDetails__specsTitle">Cell</p>
              <p
                className="productDetails__specsInfo"
              >
                {currentProduct?.cell.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <YouMayAlsoLike />
    </div>
  );
};
