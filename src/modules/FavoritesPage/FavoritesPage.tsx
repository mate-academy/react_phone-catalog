import { Link } from 'react-router-dom';
import styles from './FavoritesPage.module.scss';
import { ProductCard } from '../../components/ProductCard';
import { useContext } from 'react';
import { StateContext } from '../../Store';

export const FavoritesPage = (params: { category: string }) => {
  const { category } = params;
  const state = useContext(StateContext);
  const { favorites, products } = state;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <section className={styles.topFirst}>
          <Link to="/">
            <img src="img/Home.Icon.svg" alt="iconHome" />
          </Link>
          <img
            src="img/arrowRightLight.svg"
            alt="arrowRight"
            className={styles.arrowRight}
          />
          <Link to={`/${category}`} className={styles.name}>
            {category}
          </Link>
        </section>
      </div>

      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.favoritsLength}>{`${favorites.length} items`}</p>

      {favorites.length > 0 ? (
        <ul className={styles.list}>
          {products
            .filter(item => favorites.includes(item.itemId))
            .map(item => (
              <li key={item.id} className={styles.listItem}>
                <div className={styles.card}>
                  <ProductCard
                    key={item.id}
                    img={item.image}
                    name={item.name}
                    price={item.fullPrice}
                    screen={item.screen}
                    capacity={item.capacity}
                    ram={item.ram}
                    secondPrice={item.price}
                    product={item}
                  />
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <h1 className={styles.empty}>
            Your Favorite products will be collected here
          </h1>
        </div>
      )}
    </div>
  );
};
