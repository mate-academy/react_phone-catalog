import { useCart } from '../../../../ProductsContext/CartContext';
import { useFavourite } from '../../../../ProductsContext/FavouriteContext';
import { Product } from '../../../../ProductsContext/TabsContext';
import styles from './CardProduct.module.scss';

interface CardProductProps {
  element: Product;
  sale: boolean;
}

export const CardProduct: React.FC<CardProductProps> = ({ element, sale }) => {
  const { favourites, toggleFavourite } = useFavourite();
  const { cartItems, toggleCart } = useCart();

  const isFavourite = favourites.includes(element.id);
  const isInCart = cartItems.includes(element.id);

  const inform = [
    { name: 'Screen', value: element.screen },
    { name: 'Capacity', value: element.capacity },
    { name: 'RAM', value: element.ram },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img src={element.image} alt={element.name} />
      </div>

      <div className={styles.title}>{element.name}</div>

      <div className={styles.containerPrice}>
        <div className={styles.price}>${element.price}</div>

        {sale && <div className={styles.fullPrice}>${element.fullPrice}</div>}
      </div>

      <div className={styles.blockInform}>
        {inform.map((inf, index) => (
          <div key={index} className={styles.information}>
            <div className={styles.name}>{inf.name}</div>
            <div className={styles.value}>{inf.value}</div>
          </div>
        ))}
      </div>

      <div className={styles.blockButtons}>
        <button
          className={`${styles.add} ${isInCart ? styles.addedToCart : ''}`}
          onClick={() => toggleCart(element.id)}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </button>

        <button
          className={styles.favourites}
          onClick={() => toggleFavourite(element.id)}
        >
          <img
            src={
              isFavourite ? '/img/favourites-active.svg' : '/img/favourites.svg'
            }
            alt="Favourites"
          />
        </button>
      </div>
    </div>
  );
};
