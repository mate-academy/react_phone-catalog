import { useAppSelector, useComponentLoading } from '../../app/hooks';
import { ProductCard } from '../cards/ProductCard';
import { PageTitle } from '../titles/PageTitle';
import { Loader } from '../ui/Loader';
import { ShownRoute, ShownRouteOrigin } from '../ui/ShownRoute';
import cl from './Favorites.module.scss';

const textContent = {
  title: {
    en: 'Favorites',
    ua: 'Улюблене',
  },
  items: {
    en: 'items',
    ua: 'моделей',
  },
};

export const Favorites = () => {
  const isLoading = useComponentLoading(300);
  const { favoritesList } = useAppSelector(st => st.products);
  const { language } = useAppSelector(st => st.global);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container">
      <ShownRoute origin={ShownRouteOrigin.ONFAV} />

      <div className={cl.titleContainer}>
        <PageTitle text={textContent.title[language]} />
        <small
          className={cl.titleContainer__info}
        >{`${favoritesList.length} ${textContent.items[language]}`}</small>
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
