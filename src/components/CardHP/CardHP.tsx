import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import { useFavourites } from '../FavouritesPage/FavouritesContext';
import './CardHP.scss';

// Використовуємо твій інтерфейс Product або розширюємо локальний
interface Product {
  id: number;
  itemId: string; // Важливо для маршруту
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  ram: string;
  image: string;
  category: string;
}

type Props = {
  product: Product;
};

export const CardHP: FC<Props> = ({ product }) => {
  const { cart, addToCart,removeItem } = useCart();
  const { favourites, addToFav } = useFavourites();

  const isFav = favourites.some(fav => fav.id === product.id);
  const isAdded = cart.some(item => String(item.id) === String(product.id));
  // Шлях до сторінки опису, наприклад: /phones/apple-iphone-13
  const productPath = `/${product.category}/${product.itemId}`;

  // Магія Vite для GitHub Pages (щоб картинки не ламалися)
  const baseUrl = import.meta.env.BASE_URL;
const handleAdd=()=>{
  if (isAdded){
    removeItem(String(product.id));}
    else{ addToCart({ ...product, id: String(product.id), quantity: 1 });

    }

}
  return (
    <article className="product-card">
      {/* ЛІНК ТЕПЕР ОБГОРТАЄ І КАРТИНКУ, І НАЗВУ */}
      <Link
        to={productPath}
        className="product-card__link"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div className="product-card__image">
          {/* Додали baseUrl до картинки товару */}
          <img src={`${baseUrl}/${product.image}`} alt={product.name} />
        </div>
      </Link>

        {/* Назва тепер всередині лінка і буде клікабельною! */}
        <h2 className="product-card__title">{product.name}</h2>

      <div className="product-card__prices">
        <span className="product-card__price">${product.price}</span>
        <span className="product-card__full-price">${product.fullPrice}</span>
      </div>

      <div className="product-card__divider" />

      <ul className="product-card__specs">
        {[
          ['Screen', product.screen],
          ['Capacity', product.capacity],
          ['RAM', product.ram],
        ].map(([label, value]) => (
          <li key={label} className="product-card__specs__spec">
            <span className="product-card__specs__spec__name">{label}</span>
            <span className="product-card__specs__spec__value">{value}</span>
          </li>
        ))}
      </ul>

      <div className="product-card__actions">
        <button
          type="button"
          onClick={handleAdd}
          className={`product-card__add ${
            isAdded ? 'product-card__add--active' : ''
          }`}
        >
          {isAdded ? 'Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          className="product-card__fav"
          onClick={() => addToFav(product)}
        >
          {/* Додали baseUrl до іконок сердечка */}
          <img
            className="product-card__fav__icon"
            src={
              isFav
                ? `${baseUrl}/img/icons/Favourites Filled (Heart Like).png`
                : `${baseUrl}/img/icons/Favourites (Heart Like).png`
            }
            alt="Fav icon"
          />
        </button>
      </div>
    </article>
  );
};
