import styles from './Favourites.module.scss';
import home from '../../assets/icons/home.svg';
import homeWhite from '../../assets/icons/home-white.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import arrowRightWhite from '../../assets/icons/arrow-right-white.svg';
import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getProducts } from '../../api/api';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { FavouritesContext } from '../context/FavouritesContext';
import { useLanguage } from '../context/LanguageContext';
import emptyFavorite from '../../assets/images/product-not-found.png';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export const Favourites = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('Favourites must be used inside FavouritesProvider');
  }

  const { favourites } = context;
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getProducts();

      const newProducts = allProducts.filter(product =>
        favourites.includes(product.itemId),
      );

      setProducts(newProducts);
    };

    fetchProducts();
  }, [favourites]);

  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className={styles.favourites}>
      <div className={styles.breadcrumbs}>
        <NavLink to="/" className={styles.home}>
          <img src={theme === 'dark' ? homeWhite : home} alt="Home" />
        </NavLink>
        <img
          src={theme === 'dark' ? arrowRightWhite : arrowRight}
          alt=""
          className={styles.arrow}
        />
        <span className={styles.current}>{t('Favourites')}</span>
      </div>

      <h1 className={styles.title}>{t('Favourites')}</h1>

      {products.length > 0 && (
        <p className={styles.subtitle}>
          {products.length} {products.length === 1 ? t('item') : t('items')}
        </p>
      )}

      {favourites.length === 0 ? (
        <div className={styles.emptyFavorite}>
          <img src={emptyFavorite} alt="" className={styles.emptyImage} />

          <h2 className={styles.emptyTitle}>{t('YourFavourites')}</h2>
          <p className={styles.emptyText}>{t('EmptyFavoriteText')}</p>
          <button
            type="button"
            className={styles.startShopping}
            onClick={() => navigate('/')}
          >
            {t('StartShopping')}
          </button>
        </div>
      ) : (
        <div className={styles.products}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              screen={product.screen}
              capacity={product.capacity}
              ram={product.ram}
              fullPrice={product.fullPrice}
              showFullPrice={true}
              itemId={product.itemId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
