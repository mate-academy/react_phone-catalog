import { Link } from 'react-router-dom';
import { useFavourites } from '../../context/Favouritescontext';
import { ProductCard } from '../Card/ProductCard';
import { Navigation } from '../Navigation/Navigation';
import { Footer } from '../Footer/Footer';
import styles from './FavouritesPage.module.scss';
import homeImg from '../../items/Home.png';
import arrowRight from '../../items/vector_right_black.png';

export const FavouritesPage = () => {
  const { favourites } = useFavourites();

  return (
    <>
      <Navigation />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.inner}>
            <nav className={styles.breadcrumbs} aria-label="breadcrumb">
              <Link to="/" className={styles.breadcrumb_home} aria-label="Home">
                <img className={styles.homeImage} src={homeImg} alt="home" />
              </Link>
              <span className={styles.breadcrumb_separator}>
                <img
                  className={styles.arrowR}
                  src={arrowRight}
                  alt="arrowRight"
                />
              </span>
              <span className={styles.breadcrumb_current}>Favourites</span>
            </nav>

            <h1 className={styles.title}>Favourites</h1>
            <p className={styles.count}>
              {favourites.length} {favourites.length === 1 ? 'item' : 'items'}
            </p>

            {favourites.length === 0 ? (
              <div className={styles.empty}>
                <p className={styles.empty_text}>
                  No favourites yet. Start adding products you like!
                </p>
                <Link to="/" className={styles.empty_link}>
                  Go to Home
                </Link>
              </div>
            ) : (
              <ul className={styles.products_list}>
                {favourites.map(product => (
                  <li key={product.id} className={styles.products_item}>
                    <Link
                      to={`/product/${product.id}`}
                      className={styles.card_link}
                    >
                      <ProductCard
                        id={product.id}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        fullPrice={product.fullPrice}
                        screen={product.screen}
                        capacity={product.capacity}
                        ram={product.ram}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
