import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import './ProductCard.scss';
import { useFavorites } from '../context/FavoritesContext';
import { useCartContext } from '../context/CartContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { cartItems, addItem } = useCartContext();
  const active = isFavorite(product.id);

  const isInCart = cartItems.some(item => item.id === product.itemId);
  const BASE = import.meta.env.BASE_URL;

  const imagePath = `${BASE}img/phones/${product.namespaceId}/${product.color}/00.webp`;

  /*const handleAddClick = () => {
    setCartItems(prev => [
      ...prev,
      {
        id: product.itemId,
        name: product.name,
        image: product.image || imagePath,
        price: product.price,
        quantity: 1,
        color: 'default',
        capacity: 'default',
      },
    ]);

    setIsAdded(true);
  };*/

  return (
    <div className="product-card" data-cy="product">
      <Link to={`/product/${product.itemId}`} className="product-card__image">
        <img
          src={product.image ? `${BASE}${product.image}` : imagePath}
          alt={product.name}
        />
      </Link>
      <div className="product-card__content">
        <Link to={`/product/${product.itemId}`} className="product-card__name">
          {product.name}
        </Link>

        <div className="product-card__price">
          <span className="product-card__price-new">${product.price}</span>
          {product.fullPrice && product.fullPrice !== product.price && (
            <span className="product-card__price-old">
              ${product.fullPrice}
            </span>
          )}
        </div>
        <div className="product-card__divider" />

        <ul className="product-card__specs">
          <li>
            <span>Screen</span>
            <span>{product.screen.split('(')[0]}</span>
          </li>
          <li>
            <span>Capacity</span>
            <span>{product.capacity}</span>
          </li>
          <li>
            <span>RAM</span>
            <span>{product.ram}</span>
          </li>
        </ul>

        <div className="product-card__buttons">
          <button
            className={`product-card__button1 ${isInCart ? 'added' : ''}`}
            disabled={isInCart}
            onClick={() =>
              addItem({
                id: product.itemId,
                name: product.name,
                image: product.image || imagePath,
                price: product.price,
                quantity: 1,
                color: 'default',
                capacity: 'default',
              })
            }
          >
            {isInCart ? 'Added' : 'Add to cart'}
          </button>

          <button
            className={`product-card__button2 ${active ? 'active' : ''}`}
            onClick={() => toggleFavorite(product)}
          >
            <img
              src={
                active
                  ? `${BASE}img/icons/red.svg`
                  : `${BASE}img/icons/favourites.svg`
              }
              alt="Add to favorites"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
