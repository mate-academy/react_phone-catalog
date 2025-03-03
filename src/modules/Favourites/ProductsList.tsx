import { useFavourites } from '../shared/context/FavouritesContext';
import { useProducts } from '../shared/context/ProductsContext';
import { ProductItem } from '../shared/ProductItem';
import style from './ProductsList.module.scss';

export const ProductsList = () => {
  const { favourites } = useFavourites();
  const { products } = useProducts();
  const favouriteProducts = products.filter(product =>
    favourites.includes(product.id),
  );

  return (
    <div className={style.favorites}>
      <div className={style.favorites__header}>
        <a href="/">
          <img src="icons/home.png" alt="Back home" />
        </a>
        <img src="icons/arrow-right.png" alt="Favorites" />
        <span className={style.favorites__name}>Favourites</span>
      </div>
      <h1 className={style.title}>Favourites</h1>
      <p className={style.favorites__quantity}>
        {`${favourites.length}`} items
      </p>
      <div className={style.favorites__items}>
        {favouriteProducts.map(favouriteProduct => (
          <ProductItem
            product={favouriteProduct}
            key={favouriteProduct.id}
            styles={{ margin: 0, width: '300px' }}
          />
        ))}
      </div>
    </div>
  );
};
