import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../../Components/ProductCart/ProductCart';
import { ProductType } from '../../types/ProductType';
import { getProducts } from '../../Api/api';
import { getFavourites } from '../../Api/favourites';
import './Favourites.scss';

export const Favourites = () => {
  const [products, setProducts] = useState<ProductType[]>();

  const fetchProducts = async () => {
    const favourites = getFavourites();

    if (!favourites) {
      return;
    }

    const response = await getProducts({ itemIds: favourites });

    setProducts(response.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!products) {
    return;
  }

  return (
    <div className="favourites">
      <Breadcrumbs paths={[{ name: 'Favourites' }]} />

      <h1 className="favourites__title">Favourites</h1>
      {!!products.length ? (
        <>
          <p className="favourites__subtitle body-text">
            {products.length} items
          </p>
          <div className="favourites__container">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                wide={true}
                favouriteCallback={fetchProducts}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="favourites__empty">
          <h2>Favourites is empty</h2>
        </div>
      )}
    </div>
  );
};
