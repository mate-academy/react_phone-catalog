import React, { useContext } from 'react';
import './ProductCard.scss';
import { Product } from '../../../types/Product';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../store/GlobalContext';
import { ShoppingCartProduct } from '../../../types/ShoppingCartProduct';

type Props = {
  product: Product;
  displayType: 'fullPrice' | 'with-discount';
};

export const ProductCard: React.FC<Props> = ({ product, displayType }) => {
  const {
    shoppingCart,
    setShoppingCart,
    favorites,
    setFavorites,
    setProducts,
  } = useContext(GlobalContext);

  const handleAddToCart = (currentProduct: Product) => {
    const isInCart = shoppingCart.some(
      item => item.id === currentProduct.itemId,
    );

    if (!isInCart) {
      const newProduct: ShoppingCartProduct = {
        id: currentProduct.itemId,
        quantity: 1,
        product: currentProduct,
      };

      setShoppingCart(prevCart => [...prevCart, newProduct]);

      setProducts(prevProducts =>
        prevProducts.map(prod =>
          prod.itemId === currentProduct.itemId
            ? { ...prod, shoppingCart: true }
            : prod,
        ),
      );
    }
  };

  const handleAddToFavorites = (currentProduct: Product) => {
    const isInFavorites = favorites.some(
      item => item.itemId === currentProduct.itemId,
    );

    if (isInFavorites) {
      setFavorites(prevFavorites =>
        prevFavorites.filter(item => item.itemId !== currentProduct.itemId),
      );
      setProducts((prevProducts: Product[]) =>
        prevProducts.map(pr =>
          pr.itemId === currentProduct.itemId
            ? { ...pr, favorites: false }
            : pr,
        ),
      );
    } else {
      setFavorites(prevFavorites => [
        ...prevFavorites,
        { ...currentProduct, favorites: true },
      ]);
      setProducts(prevProducts =>
        prevProducts.map(prod =>
          prod.itemId === currentProduct.itemId
            ? { ...prod, favorites: true }
            : prod,
        ),
      );
    }
  };

  const isInCart = shoppingCart.some(item => item.id === product.itemId);
  const isFavorites = favorites.some(item => item.itemId === product.itemId);

  return (
    <div className="productCard">
      <Link
        className="productCard__activeClick"
        to={`/${product.category}/${product.itemId}`}
      >
        <div className="productCard__container-photo">
          <img
            src={product.image}
            alt="Product's photo"
            className="productCard__photo"
          />
        </div>

        <div className="productCard__container-title">
          <span className="productCard__title">{product.name}</span>
        </div>

        <div className="productCard__container-price">
          {displayType === 'fullPrice' && (
            <span className="productCard__price-regular-without-discount">
              {`$${product.fullPrice}`}
            </span>
          )}

          {displayType === 'with-discount' && (
            <>
              <span className="productCard__price-discount">
                {`$${product.price}`}
              </span>
              <span className="productCard__price-regular">
                {`$${product.fullPrice}`}
              </span>
            </>
          )}
        </div>

        <div className="productCard__divider"></div>

        <div className="productCard__container-specifications">
          <div className="productCard__block">
            <span className="productCard__info">Screen</span>
            <span className="productCard__value">{product.screen}</span>
          </div>
          <div className="productCard__block">
            <span className="productCard__info">Capacity</span>
            <span className="productCard__value">{product.capacity}</span>
          </div>
          <div className="productCard__block">
            <span className="productCard__info">RAM</span>
            <span className="productCard__value">{product.ram}</span>
          </div>
        </div>
      </Link>

      <div className="productCard__container-buttons">
        <button
          className={
            isInCart
              ? 'productCard__button-addedToCard'
              : 'productCard__button-addToCard'
          }
          onClick={() => handleAddToCart(product)}
        >
          {isInCart ? `Added` : `Add to cart`}
        </button>
        <button
          className={
            isFavorites
              ? 'productCard__button-isFavourite'
              : 'productCard__button-addToFavourite'
          }
          onClick={() => handleAddToFavorites(product)}
        ></button>
      </div>
    </div>
  );
};
