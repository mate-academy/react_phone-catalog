import { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageContext } from '../../utils/GlobalContext';

import './Favouriets.scss';
import '../Pages.scss';

import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../types/Product';

export const Favouriets = () => {
  const {
    favorietsList,
    products,
  } = useContext(PageContext);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [favoriets, setFavoriets] = useState<Product[]>([]);

  useEffect(() => {
    setFavoriets(() => {
      return products.filter(p => favorietsList.includes(p.id));
    });
  }, [favorietsList, products]);

  const filteredFavoriets = favoriets
    .filter(f => f.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="products-page">
      <div className="products-page__link-way">
        <Link to="/home" className="products-page__home-link" />
        <div className="products-page__way-arrow" />
        <Link
          to="/favouriets"
          className="products-page__text-link"
        >
          Favouriets
        </Link>
      </div>

      <h1 className="products-page__title">Favouriets</h1>

      <p className="products-page__count">{`${favorietsList.length} items`}</p>

      <div className="favouriets__body">
        {favoriets.length
          ? (
            <>
              {filteredFavoriets.map(product => {
                return (
                  <ProductCard
                    product={product}
                    section="favouriets"
                    key={product.id}
                  />
                );
              })}
            </>
          ) : (
            <h2 className="cart__empty">Your Favouriets list is empty</h2>
          )}
      </div>
    </div>
  );
};
