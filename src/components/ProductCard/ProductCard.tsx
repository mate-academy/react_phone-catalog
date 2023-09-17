import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

import { CartContext } from '../../providers/CartProvider/CartProvider';

import { FavContext } from '../../providers/FavProvider/FavProvider';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { AddToFavButton } from '../AddToFavButton/AddToFavButton';

import { getProduct } from '../../api/products';
import { getDiscount } from '../../helpers/getDiscount';

import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductType } from '../../types/ProductType';

import errorIcon from '../../images/error.svg';

import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = React.memo(({ product }) => {
  const {
    name,
    price,
    discount,
    screen,
    capacity,
    ram,
    id,
    imageUrl,
    type,
  } = product;

  const { productsInCart, setProductsInCart } = useContext(CartContext);
  const { favoriteProducts, setFavoriteProducts } = useContext(FavContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [productWithDetails, setProductWithDetails]
    = useState<ProductDetails>();

  useEffect(() => {
    setIsLoading(true);

    const loadProduct = async () => {
      try {
        const productFromServer = await getProduct(product.id);

        setProductWithDetails(productFromServer);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();

    return () => {
      setIsLoading(false);
    };
  }, []);

  const discountedPrice = getDiscount(price, discount);

  const getTypeOfProduct = (prodType: string) => {
    switch (prodType) {
      case ProductType.tablet:
        return 'tablets';

      case ProductType.accessory:
        return 'accessories';

      case ProductType.phone:
      default:
        return 'phones';
    }
  };

  const productType = getTypeOfProduct(type);

  const isItemInCart = productsInCart.some(cartItem => cartItem.id === id);

  const handleAddToCart = () => {
    if (isItemInCart) {
      const updatedCart = productsInCart.filter(cartItem => cartItem.id !== id);

      setProductsInCart(updatedCart);

      return;
    }

    const newProd = {
      ...product,
      quantity: 1,
    };

    setProductsInCart([...productsInCart, newProd]);
  };

  const isItemFav = favoriteProducts.some(favProd => favProd.id === id);

  const handleAddToFavorites = () => {
    if (isItemFav) {
      const updatedFavorites = favoriteProducts.filter(
        favProd => favProd.id !== id,
      );

      setFavoriteProducts(updatedFavorites);

      return;
    }

    setFavoriteProducts([...favoriteProducts, product]);
  };

  const topRef = useRef<HTMLDivElement>(null);

  return (
    <div className="ProductCard" ref={topRef}>
      <div className="ProductCard__content">
        {isError && (
          <div className="ProductCard__error">
            <img
              src={errorIcon}
              alt="error"
              className="ProductCard__error-img"
            />
            <h2>Product download error</h2>
          </div>
        )}
        {isLoading && !isError ? (
          <RotatingLines
            strokeColor="#EB5757"
            strokeWidth="5"
            animationDuration="0.75"
            width="66"
            visible={isLoading}
          />
        ) : !isError && (
          <>
            {productWithDetails && (
              <Link
                to={`/${productType}/${id}`}
                state={productWithDetails}
                className="ProductCard__photo"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                  });
                }}
              >
                <img
                  src={imageUrl}
                  alt="product"
                  className="ProductCard__img"
                />
              </Link>
            )}

            <div className="ProductCard__title">{name}</div>

            <div className="ProductCard__price">
              <div className="ProductCard__price-normal">{`$${discountedPrice}`}</div>
              {discount > 0 && (
                <div className="ProductCard__price-discounted">{`$${price}`}</div>
              )}
            </div>

            <div className="ProductCard__details">
              <div className="ProductCard__details-item">
                <div className="ProductCard__details-item__name">Screen</div>
                <div className="ProductCard__details-item__value">
                  {screen || '-'}
                </div>
              </div>
              <div className="ProductCard__details-item">
                <div className="ProductCard__details-item__name">Capacity</div>
                <div className="ProductCard__details-item__value">
                  {capacity || '-'}
                </div>
              </div>
              <div className="ProductCard__details-item">
                <div className="ProductCard__details-item__name">RAM</div>
                <div className="ProductCard__details-item__value">
                  {ram || '-'}
                </div>
              </div>
            </div>

            <div className="ProductCard__buttons">
              <AddToCartButton handleAddToCart={handleAddToCart} id={id} />
              <AddToFavButton
                handleAddToFavorites={handleAddToFavorites}
                isItemFav={isItemFav}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
});
