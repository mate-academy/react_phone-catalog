import { useAppSelector } from '../../store';
import { selectFavoritesItems } from '../../store/slices/favoritesSlice';
import Card from '../Card/Card';
import styles from './style.module.scss';

const Favorites = () => {
  const items = useAppSelector(selectFavoritesItems);

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h2 className={styles.emptyTitle}>Your favorites are empty</h2>
        <p className={styles.emptyMessage}>
          Add some products to your favorites to see them here
        </p>
      </div>
    );
  }

  const products = items.map(item => ({
    id: parseInt(item.id) || 0,
    category: item.category,
    itemId: item.id,
    name: item.name,
    fullPrice: item.fullPrice,
    price: item.price,
    screen: item.screen,
    capacity: item.capacity,
    color: '',
    ram: item.ram,
    year: 0,
    image: item.image,
  }));

  return (
    <div className={styles.favoritesContainer}>
      <div className={styles.catalogue}>
        {products.map(product => (
          <Card
            key={product.itemId}
            product={product}
            extraClassName="catalogueCard"
            showDiscount={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
