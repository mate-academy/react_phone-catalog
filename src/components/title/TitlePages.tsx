import styles from './TitlePages.module.scss';
import { useAppSelector } from '../../app/hooks';
type Props = {
  type:
  | 'notFound'
    | 'home'
    | 'favourites'
    | 'cart'
    | 'phones'
    | 'accessories'
    | 'tablets';
};
const titles: Record<Props['type'], string | null> = {
  home: 'Welcome to Nice Gadgets store!',
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
  notFound: 'Page not found!',
  favourites: 'Favourites',
  cart: 'Cart',
};

export const TitlePages = ({ type }: Props) => {
  let count: number | null = null;
  const products = useAppSelector(store => store.products.products);
  const favourites = useAppSelector(store => store.products.products);

  if (['phones', 'tablets', 'accessories', 'favourites'].includes(type)) {
    count = products.filter(product => product.category === type).length;
    if (type === 'favourites') {
      count = favourites.length;
    }
  }
  return titles ? (
    <div className={styles.title}>
      <h1 className={styles.title__text}>{titles[type]}</h1>
      {count !== null && <p className={styles.title__count}>{count} models</p>}
      {type === 'favourites' && (
        <p className={styles.title__count}>{count} items</p>
      )}
    </div>
  ) : null;
};
