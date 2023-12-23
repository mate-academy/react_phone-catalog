import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { ProductCardType } from '../types/ProductCardType';
import { getProductCard } from '../api';
import { CartContext } from '../context/CardContext';
import { FavouriteContext } from '../context/FavouriteContext';
import { Loader } from './Loader/Loader';
import './ProductCard.scss';
import { AddToCart } from './AddToCard';
import { AddToFavourites } from './AddToFavourites';

type Props = {
  product: ProductCardType;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    itemId,
    category,
    id,
  } = product;
  const [productWithDetails, setProductWithDetails]
    = useState<ProductCardType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { favouriteProducts, setFavouriteProducts }
    = useContext(FavouriteContext);
  const { productsInCart, setProductsInCart } = useContext(CartContext);

  useEffect(() => {
    setIsLoading(true);

    const loadProduct = async () => {
      try {
        const productFromServer = await getProductCard(itemId);

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
  }, [itemId]);

  const topRef = useRef<HTMLDivElement>(null);

  // const isItemFavourite = favouriteProducts.some(favProd => favProd.id === id);
  const [isItemFavourite, setIsItemFavourite]
  = useState(favouriteProducts.some(favProd => favProd.id === id));

  const handleAddToFavourites = () => {
    setIsItemFavourite(!isItemFavourite);

    if (isItemFavourite) {
      const updateFavurite = favouriteProducts.filter(
        favProd => favProd.id !== id,
      );

      setFavouriteProducts(updateFavurite);

      return;
    }

    setFavouriteProducts([...favouriteProducts, product]);
  };

  const isItemInCart = productsInCart.some(item => item.id === id);

  const handleAddToCart = () => {
    if (isItemInCart) {
      const updateCart = productsInCart.filter(
        cartItem => cartItem.id !== id,
      );

      setProductsInCart(updateCart);

      return;
    }

    const newProduct = {
      ...product,
      quantity: 1,
    };

    setProductsInCart([...productsInCart, newProduct]);
  };

  return (
    <div className="ProductCard" ref={topRef}>
      <div className="ProductCard__content">
        {isError && !isLoading && (
          <div className="ProductCard__error">
            <h2>Product download error</h2>
          </div>
        )}
        {isLoading && !isError ? (
          <Loader />
        ) : !isError && (
          <>
            {productWithDetails && (
              <Link
                to={`/${category}/${itemId}`}
                state={productWithDetails}
                className="ProductCard__photo"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                  });
                }}
              >
                <img
                  src={`https://mate-academy.github.io/react_phone-catalog/_new/${image}`}
                  alt="product"
                  className="ProductCard__img"
                />
              </Link>
            )}

            <div className="ProductCard__wrap">
              <div className="ProductCard__title">{name}</div>

              <div className="ProductCard__price">
                <div className="ProductCard__price-normal">{`$${price}`}</div>
                {price && (
                  <div className="ProductCard__price-discounted">{`$${fullPrice}`}</div>
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
                  <div className="ProductCard__details-item__name">
                    Capacity
                  </div>
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
                <AddToCart
                  handleAddToCart={handleAddToCart}
                  id={id}
                />
                <AddToFavourites
                  handleAddToFavourites={handleAddToFavourites}
                  isItemFavourite={isItemFavourite}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
