import { useLocation } from 'react-router-dom';
import BreadCrumbs from '../shared/BreadCrumbs';
import styles from './FavouritesPage.module.scss';
import { useContext } from 'react';
import Card from '../shared/Card';
import { LikeContext } from '../../contexts/LikeContextProvider';

export const FavouritesPage = () => {
  const { pathname } = useLocation();

  const { likeCards } = useContext(LikeContext);

  return (
    <main className={styles.favourites}>
      <section className={styles.favourites__crumbs}>
        <BreadCrumbs pathname={pathname} />
      </section>

      <section className={styles.favourites__header}>
        <h1 className={styles.favourites__title}>Favourites</h1>

        <p className={styles.favourites__content}>{likeCards.length} items</p>
      </section>

      <section className={styles.favourites__products}>
        {likeCards.map(card => {
          return (
            <Card
              key={'id' + card.id}
              itemId={card.itemId}
              name={card.name}
              category={card.category}
              price={card.price}
              fullPrice={card.fullPrice}
              screen={card.screen}
              capacity={card.capacity}
              ram={card.ram}
              image={card.image}
              isHot
            />
          );
        })}
      </section>
    </main>
  );
};
