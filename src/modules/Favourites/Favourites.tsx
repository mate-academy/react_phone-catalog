import { useNavigate } from 'react-router-dom';
import { Pagetoolbar } from '../../components/layout/Pagetoolbar';
import { ProductCard } from '../../components/layout/ProductCard';
import { Button } from '../../components/ui/Button';
import { useFavourites } from '../../hooks/useFavourites';
import { imageUrl } from '../../utils/imageUrl';
import styles from './Favourites.module.scss';
import { useTheme } from '../../hooks/useTheme';

export const Favourites = () => {
  const { favourites } = useFavourites();
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Pagetoolbar
        breadcrumbs
        title="Favourites"
        subtitle={`${favourites.length} items`}
      />
      <div className={styles.content}>
        {favourites.length === 0 ? (
          <div className={styles.empty}>
            <img
              src={
                theme === 'dark'
                  ? imageUrl('icons/Favourites_white.svg')
                  : imageUrl('icons/Favourites.svg')
              }
              alt=""
              className={styles.empty__img}
            />
            <h3 className={styles.empty__title}>Yout wishlist is empty!</h3>
            <p className={styles.empty__subtitle}>
              Add your favourites products
            </p>
            <Button onClick={() => navigate('/catalog')}>Catalog</Button>
          </div>
        ) : (
          <div className={styles.products}>
            {favourites.map(item => {
              return <ProductCard key={item.id} product={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
