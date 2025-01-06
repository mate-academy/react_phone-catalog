import { Container } from '../../shared/components/Container';
import { Navigation } from '../../shared/components/Navigation/Navigation';
import { CardTemplate } from '../../shared/components/CardTemplate';
import { Product } from '../../types/Product';
import { ProductItem } from '../../types/ProductItem';
import { useProducts } from '../../shared/utils/ProductsContext';
import s from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const { favourites } = useProducts();

  return (
    <section className={s.FavouritesPage}>
      <Container>
        <div className={s.PageContent}>
          <Navigation address="favourites" />
          <h1 className={s.PageTitle}>Favourites</h1>
          <p className={s.ItemsSum}>
            {favourites.length !== 0
              ? favourites.length !== 1
                ? `${favourites.length} items`
                : '1 item'
              : 'no items'}
          </p>

          <ul className={s.Catalog}>
            {favourites.length > 0 ? (
              favourites.map((item: Product | ProductItem) => (
                <li key={item.id} className={s.FavouriteItem}>
                  <CardTemplate product={item} discount={false} />
                </li>
              ))
            ) : (
              <p>There are no favorites yet.</p>
            )}
          </ul>
        </div>
      </Container>
    </section>
  );
};
