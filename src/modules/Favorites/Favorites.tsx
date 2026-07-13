import { useTranslation } from 'react-i18next';
import { useFavourites } from '../../context/FavouriteContext';
import { Card } from '../shared/Card';
import { TitleSection } from '../shared/TitleSection';
import styles from './Favourites.module.scss';

export const Favourites = () => {
  const { favouriteItems } = useFavourites();

  const { t } = useTranslation();

  return (
    <div className={styles.favourites}>
      <TitleSection
        historyText={t('Favourites')}
        title={t('Favourites')}
        quantity={favouriteItems.length}
      />
      <div className={styles.productsList}>
        {favouriteItems.map(item => (
          <Card
            key={item.id}
            id={item.id}
            image={item.product.images[0]}
            name={item.product.name}
            price={item.product.priceDiscount}
            fullPrice={item.product.priceRegular}
            screen={item.product.screen}
            capacity={item.product.capacity}
            ram={item.product.ram}
          />
        ))}
      </div>
    </div>
  );
};
