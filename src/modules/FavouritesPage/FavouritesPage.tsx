import { useContext } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { StateContext } from '../../contex/State';
import styles from './FavouritesPage.module.scss';
import { Grid } from '../../components/Grid';

export const FavouritesPage = () => {
  const { favourites } = useContext(StateContext);

  return (
    <section className={styles['favourites-page']}>
      <Breadcrumbs className={styles['favourites-page__breadcrumbs']} />
      <h1 className={styles['favourites-page__title']}>Favourites</h1>
      <p className={styles['favourites-page__text']}>
        {favourites.length} items
      </p>
      <Grid products={favourites} />
    </section>
  );
};
