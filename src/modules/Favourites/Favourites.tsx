import { useContext } from 'react';
import { DataContext } from '../../context/ContextProvider';
import { Breadcrumbs } from '../shared/components/Breadcrumbs/Breadcrumbs';
import scss from './Favourites.module.scss';
import { ProductCard } from '../shared/components/ProductCard';
import { Loader } from '../shared/components/Loader'; // <--- DODAJ IMPORT LOADERA

export const Favourites = () => {
  const { favItems, products, isLoading } = useContext(DataContext); // <--- DODAJ isLoading

  if (isLoading) {
    return <Loader />;
  }

  if (favItems.length === 0) {
    return (
      <section className={scss.favourites}>
        <Breadcrumbs category="Favourites" />
        <h1>Favourites</h1>
        <p className={scss.errorNotification}>
          Your favourites list is currently empty.
        </p>
      </section>
    );
  }

  return (
    <section className={scss.favourites}>
      <Breadcrumbs category="Favourites" />
      <h1>Favourites</h1>
      <span className={scss.favourites__counter}>{favItems.length} items</span>
      <article className={scss.favourites__items}>
        {favItems.map(item => {
          const product = products.find(prod => prod.id === item.productId);

          return (
            product && (
              <ProductCard
                product={product}
                hasDiscount={item.hasDiscount}
                key={item.productId}
              />
            )
          );
        })}
      </article>
    </section>
  );
};
