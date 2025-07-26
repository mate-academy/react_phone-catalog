import { Breadcrumbs } from '../../shared/components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../../shared/components/ProductCard';
import { useFavourite } from '../context/FavouritesContext';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const { favouriteItems } = useFavourite();

  return (
    <div className={styles.favourites}>
      <Breadcrumbs firstPath="favourites" secondPath="" />
      {favouriteItems?.map(item => {
        return (
          <ProductCard
            key={item?.id}
            name={item?.name}
            images={item?.images}
            priceDiscount={item?.priceDiscount}
            priceRegular={item?.priceRegular}
            screen={item?.screen}
            capacity={item?.capacity}
            ram={item?.ram}
            id={item?.id}
            category={item?.category}
          />
        );
      })}
    </div>
  );
};
