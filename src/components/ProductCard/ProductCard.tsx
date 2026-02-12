import styles from './ProductCard.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heart from '../../Icons/HeartIcon.svg';
import heartFav from '../../Icons/hearRed.svg';
import { setRaw } from '../utils/storage';
import { setRawCart } from '../utils/storageCart';

export const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddCart, setIsAddCart] = useState(false);
  const navigate = useNavigate();

  const handleOpenPageItem = () => {
    navigate(`/item/${product.id}`, { state: { product } });
  };

  const handleFav = prod => {
    const favorites = JSON.parse(localStorage.getItem('favorites_v1')) || [];

    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter(item => item.id !== prod.id);
    } else {
      newFavorites = [...favorites, prod];
    }

    setRaw('favorites_v1', JSON.stringify(newFavorites));

    setIsFavorite(!isFavorite);

    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('addCart_v1')) || [];

    let newCart;

    if (isAddCart) {
      newCart = cart.filter(item => item.id !== product.id);
    } else {
      newCart = [...cart, product];
    }

    setRawCart('addCart_v1', JSON.stringify(newCart));
    setIsAddCart(!isAddCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites_v1')) || [];
    const alReadyFavorite = favorites.some(item => item.id === product.id);

    setIsFavorite(alReadyFavorite);
  }, [product.id]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('addCart_v1')) || [];
    const alreadyInCart = cart.some(item => item.id === product.id);

    setIsAddCart(alreadyInCart);
  }, [product.id]);

  const cleanScreenText = screen => {
    if (!screen) {
      return '';
    }

    return screen.replace(/\s*\(.*?\)\s*/g, '').trim();
  };

  return (
    <div className={styles.menuHamburguer_card} key={product.id}>
      <img
        src={product.images?.[0] || 'src/Icons/defaultImage.svg'}
        className={styles.menuHamburguer_img}
        alt={product.name || 'Imagem do produto'}
        onClick={handleOpenPageItem}
      />

      <h2 className={styles.menuHamburguer_title} onClick={handleOpenPageItem}>
        {product.name}
      </h2>

      <div className={styles.menuHamburguer_prices}>
        <h1 className={styles.menuHamburguer_price}>
          ${product.priceDiscount}
        </h1>
        {product.priceRegular && (
          <h1 className={styles.menuHamburguer_price}>
            ${product.priceRegular}
          </h1>
        )}
      </div>

      <div className={styles.menuHamburguer_dividingLine}></div>

      <div className={styles.menuHamburguer_details}>
        <div className={styles.menuHamburguer_detail}>
          <span>Screen</span>
          <span>{cleanScreenText(product.screen)}</span>
        </div>

        <div className={styles.menuHamburguer_detail}>
          <span>Capacity</span>
          <span>{product.capacity}</span>
        </div>

        <div className={styles.menuHamburguer_detail}>
          <span>RAM</span>
          <span>{product.ram}</span>
        </div>

        <div className={styles.menuHamburguer_buttons}>
          <button
            className={
              isAddCart
                ? styles.menuHamburguer_buttonAdd_active
                : styles.menuHamburguer_buttonAdd
            }
            onClick={handleAddToCart}
          >
            Add to cart
          </button>

          <div className={styles.menuHamburguer_buttonFav_container}>
            <img
              src={!isFavorite ? heart : heartFav}
              alt="IconOfAddFavorite"
              className={styles.menuHamburguer_buttonFav}
              onClick={() => handleFav(product)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
