import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CatalogContext } from '../components/CatalogContext';
import { Product } from '../types/Product';
import { ProductCard } from '../components/ProductCard';
import '../App.scss';

export const FavoritesPage = () => {
  const { favoriteProducts } = useContext(CatalogContext);

  const location = useLocation();
  const pathNameUrl = location.pathname.slice(1);

  return (
    <div className="favorites">
      <div className="favorites__top">
        <div className="brandcrumbs product-list__url favorites__url">
          <Link to="/">
            <img
              src="icons/Home.svg"
              alt="home"
              className="product-list__home"
            />
          </Link>
          <img
            src="buttons/Chevron-Arrow-Right--disabled.svg"
            alt=""
            className="product-list__url-arrow"
          />
          <p
            className="
                brandcrumbs__name
                product-list__url-pathname
              "
          >
            {pathNameUrl}
          </p>
        </div>
        <h1 className="title favorites__title">Favorites</h1>
        <p
          className="
            product-list__count
            product-list__count-content
            favorites__count"
        >
          {`${favoriteProducts.length} models`}
        </p>
      </div>

      <div
        data-cy="productList"
        className="product-list__items favorites__items"
        style={{ marginBottom: '80px' }}
      >
        {favoriteProducts.map((product: Product) => (
          <Link
            to={`/${product.category}/${product.itemId}`}
            className="product-list__link"
            key={product.id}
          >
            <ProductCard product={product} key={product.id} />
          </Link>
        ))}
      </div>
    </div>
  );
};
