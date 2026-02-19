/* eslint-disable */
import styles from './TitlePages.module.scss';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
type Props = {
  type:
    | 'notFound'
    | 'home'
    | 'favourites'
    | 'cart'
    | 'phones'
    | 'accessories'
    | 'tablets'
    | 'details';
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
  const favourite = useAppSelector(state => state.favourite.favouriteItems);
  const navigate = useNavigate();

  const productName = useAppSelector(
    state => state.productDetail.product?.name,
  );
  let count: number | null = null;
  const products = useAppSelector(store => store.products.products);

  if (['phones', 'tablets', 'accessories'].includes(type)) {
    count = products.filter(product => product.category === type).length;
  }

  const goBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      const category = location.pathname.split('/')[1];

      navigate(`/${category}`);
    }
  };

  return (
    <div className={styles.title}>
      {(type === 'details' || type === 'cart') && (
        <div className={styles.title__back}>
          <IoIosArrowBack className={styles.title__icon} />
          <span onClick={goBack} className={styles.title__button}>
            Back
          </span>
        </div>
      )}

      {
        <h1 className={styles.title__text}>
          {type === 'details' ? productName : titles[type]}
        </h1>
      }
      {count !== null && <p className={styles.title__count}>{count} models</p>}
      {type === 'favourites' && favourite.length > 0 && (
        <p className={styles.title__count}>{favourite.length} items</p>
      )}
    </div>
  );
};
