import { Crumb } from '../../components/Crumb';
import { Empty } from '../../components/Empty';
import { ProductList } from '../../components/ProductList';
import { useFavouriteContext } from '../../context/ShopContext/FavoutiteContext';
import s from './Favourite.module.scss';

export const Favourite = () => {
  const { liked } = useFavouriteContext();

  return (
    <div className={s.favourite}>
      <Crumb />
      <h1 className={s.favourite__title}>Favourite</h1>
      <div className={s.favourite__counter}>{liked.length} items</div>
      <main className={s.favourite__list}>
        {liked.length ? (
          <ProductList products={liked} />
        ) : (
          <Empty message="You have no favourite poducts" img="favourite" />
        )}
      </main>
    </div>
  );
};
