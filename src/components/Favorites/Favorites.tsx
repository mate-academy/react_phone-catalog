import { useAppSelector } from '../../app/hooks';
import { ProductCard } from '../cards/ProductCard';
import { PageTitle } from '../titles/PageTitle';
import { ShownRoute, ShownRouteOrigin } from '../ui/ShownRoute';
import cl from './Favorites.module.scss';

export const Favorites = () => {
  const { favoritesList } = useAppSelector(st => st.products);

  return (
    <div className="container">
      <ShownRoute origin={ShownRouteOrigin.ONFAV} />

      <div className={cl.titleContainer}>
        <PageTitle text="Favorites" />
        <small
          className={cl.titleContainer__info}
        >{`${favoritesList.length} items`}</small>
      </div>

      <ul className={cl.productList}>
        {favoritesList.map(item => (
          <li key={item.id} className={cl.productList__card}>
            <ProductCard product={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
