import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';
import useFavoritesStore from '../../stores/useFavoritesStore';
import useLanguageStore from '../../stores/useLanguageStore';
import styles from './FavoritesPage.module.scss';

function FavoritesPage() {
  const { favorites, removeFavorite } = useFavoritesStore();
  const { t } = useLanguageStore();

  return (
    <div className={styles.favorites}>
      <Breadcrumbs product={null} />

      {favorites.length === 0 ? (
        <p>Поки що немає улюблених товарів.</p>
      ) : (
        <>
          <div className="category-header">
            <h1>
              {t('nav_favourites')}
              {/* .charAt(0).toUpperCase() +
                 t('nav_favourites').slice(1) */}
            </h1>
            <p>
              {favorites.length} {t('category_models_count')}
            </p>
          </div>

          <div className="product-grid">
            {favorites.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
        // <ul>
        //   {favorites.map(item => (
        //     <li key={item.id} style={{ marginBottom: '5px' }}>
        //       <img
        //         src={item.image}
        //         alt={item.name}
        //         width="30"
        //         height="30"
        //         style={{ marginRight: '10px' }}
        //       />
        //       {item.name}
        //       <button
        //         onClick={() => removeFavorite(item.id)}
        //         style={{ marginLeft: '10px', backgroundColor: 'lightcoral' }}
        //       >
        //         Видалити
        //       </button>
        //     </li>
        //   ))}
        // </ul>
      )}
    </div>
  );
}

export default FavoritesPage;
