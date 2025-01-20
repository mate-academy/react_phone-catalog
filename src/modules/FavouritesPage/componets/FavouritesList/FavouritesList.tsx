import Product from '../../../../components/Product/Product';
import { useAppSelector } from '../../../../api/hooks';
import styles from './FavouritesList.module.scss';
// eslint-disable-next-line max-len
import empty from '../../../../assets/images/favouritePage/product-not-found.png';
import BreadCrumbs from '../../../../components/BreadCrumbs/BreadCrumbs';
import { useTranslation } from 'react-i18next';

const FavouritesList = () => {
  const favourites = useAppSelector(state => state.favourites.listOfDevices);
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <BreadCrumbs />
      <h1>{t('favourites')}</h1>
      {favourites.length === 0 ? (
        <img src={empty} alt="" />
      ) : (
        <>
          <p className={styles.amount}>
            {favourites.length} {t('models')}
          </p>

          <ul className={styles.list}>
            {favourites.map(favourite => (
              <Product product={favourite} key={favourite.id} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default FavouritesList;
