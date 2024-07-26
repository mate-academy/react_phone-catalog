import { useContext } from 'react';
import { ActionContext } from '../../shared/Context/ActionContext';
import { ProductContext } from '../../shared/Context/ProductContext';
import './FavoritesPage.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';

export const FavoritesPage: React.FC = () => {
  const { favouritesIds } = useContext(ActionContext);
  const { products } = useContext(ProductContext);
  const cartItems = products.filter(p => favouritesIds.find(id => id === p.id));

  const [searchParams] = useSearchParams();

  return (
    <div className="FavoritesPage">
      <div className="FavoritesPage__container">
        <div className="FavoritesPage__navigation">
          <Link to="/">
            <div className="icon icon--home"></div>
          </Link>
          <div className="icon icon--arrow-right"></div>
          <p className="FavoritesPage__navigation-title">Favirutes</p>
        </div>

        <div className="FavoritesPage__descriprion">
          <h1 className="FavoritesPage__descriprion-title">Favorites</h1>
          <p className="FavoritesPage__descriprion-amount">{`${cartItems.length} models`}</p>
        </div>

        <div className="FavoritesPage__items">
          {cartItems.map(product => (
            <div key={product.id} className="FavoritesPage__items-wrap">
              <ProductCard
                key={product.name}
                product={product}
                searchParams={searchParams}
              />
            </div>
          ))}
        </div>

        {!cartItems.length && (
          <h1 className="items__message">{`There are no favorites products`}</h1>
        )}
      </div>
    </div>
  );
};
