import { useAppSelector } from '../../app/hooks';
import './FavouritesPage.scss';
import { ProductList } from '../ProductList/ProductList';
import { Breadcrumbs } from '../../components/Breadcrumds';

export const FavouritesPage = () => {
  const { favProducts } = useAppSelector(state => state.favourites);

  const products = useAppSelector(state => state.allProducts.products);

  const myProducts = products.filter(
    item => item.id === favProducts.find(id => id === item.id),
  );

  const theme = useAppSelector(state => state.themeSwitcher.theme);

  const titleClass = `productsPage__header theme-${theme}`;

  return !!favProducts.length ? (
    <div className="productsPage">
      <div className="productsPage__constrain">
        <Breadcrumbs title={'Favourites'} />
        <h1 className={titleClass}>Favourites</h1>
        <div className="productsPage__models">{`${favProducts.length} items`}</div>

        <div className="productsPage__container">
          <ProductList products={myProducts} />
        </div>
      </div>
    </div>
  ) : (
    <div>There are no selected products</div>
  );
};
