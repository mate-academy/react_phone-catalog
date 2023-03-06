import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../types/Product';
import { Breadcrumbs } from './Breadcrumbs';
import { Footer } from './Footer';
import { Header } from './Header';
import { ProductCard } from './ProductCard';
import '../styles/favoritePage.scss';
import { Context } from '../contexts/Context';

export const FavoritesPage: React.FC = () => {
  const { fav } = useContext(Context);
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <main>
        <div className="favorites container">
          <Breadcrumbs />
          <h2 className="favorites__title">Favourites</h2>
          {fav.length > 0 ? (
            <>
              <p className="favorites__count">{`${fav.length} items`}</p>
              <div className="favorites__content">
                {fav.map((product: Product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </>
          ) : (
            <p className="favorites__subtitle">{`The ${pathname.slice(1)} is empty`}</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
