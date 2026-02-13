import { useAppSelector } from '../../app/hooks';
import styles from './ItemPage.module.scss';
import { ItemGallery } from '../../components/ItemGallery/ItemGallery';
// eslint-disable-next-line
import { ItemMainContent } from '../../components/ItemMainContent/ItemMainContent';
import { ItemAbout } from '../../components/ItemAbout/ItemAbout';

export const ItemPage = () => {
  const { item } = useAppSelector(state => state.item);

  return (
    <div className={styles.container}>
      {item ? (
        <>
          <h2>{item?.name}</h2>
          <div className={styles.header}>
            <ItemGallery images={item?.images} />
            <ItemMainContent item={item} />
          </div>
          <ItemAbout item={item} />
        </>
      ) : (
        <img
          className={styles.notFound}
          src="/react_phone-catalog/img/product-not-found.png"
          alt="product"
        />
      )}
    </div>
  );
};
