import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { Breadcrumbs } from './Breadcrumbs';
import { Footer } from './Footer';
import { Header } from './Header';
import { ProductCard } from './ProductCard';
import '../styles/favoritePage.scss';

type Props = {
  products: Product[],
};

export const FavoritesPage: React.FC<Props> = ({ products }) => {
  const availableProducts
    = products.filter(
      product => localStorage.getItem('favorites')?.includes(product.id),
    );

  const foundFav
    = JSON.parse(localStorage.getItem('favorites') || '').map(
      (item: string) => item,
    );

  const [items, setItems] = useState(foundFav);

  useEffect(() => {
    setItems(foundFav);
  }, [foundFav]);

  return (
    <>
      <Header />
      <main>
        <div className="favorites container">
          <Breadcrumbs />
          <h2 className="favorites__title">Favourites</h2>
          {availableProducts.length > 0 ? (
            <>
              <p className="favorites__count">{`${items.length} items`}</p>
              <div className="favorites__content">
                {availableProducts.map(product => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </>
          ) : (
            <p>Products not found</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
