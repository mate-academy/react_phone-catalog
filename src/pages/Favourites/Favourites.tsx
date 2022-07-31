import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../../type';
import '../../container.scss';
import { NavPages } from '../../components/NavPages/NavPages';
import { PricesPhone } from '../../helpers/PricesPhone/PricesPhone';
import './Favourites.scss';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

type Props = {
  products: Product[]
};

export const Favourites: React.FC<Props> = ({ products }) => {
  const searchParams = new URLSearchParams(useLocation().search);
  const searchInput = searchParams.get('searchInput') || '';
  let visibleProducts = products
    .filter(product => localStorage
      .getItem('favourites')?.includes(product.id));

  visibleProducts = useMemo(() => {
    if (searchInput) {
      return visibleProducts
        .filter(product => product.name
          .toLowerCase().includes(searchInput.toLowerCase()));
    }

    searchParams.delete('searchInput');

    return visibleProducts;
  }, [searchInput, visibleProducts]);

  return (
    <div className="wrapper">
      <div className="top">
        <Header />
        <main className="favourites">
          <div className="container">
            <NavPages />
            <h1 className="favourites__title h1">Favourites</h1>
            {visibleProducts.length !== 0 ? (
              <>
                <div className="favourites__number bodytext">
                  {visibleProducts.length}
                  {' '}
                  items
                </div>
                <div className="favourites__list">
                  {visibleProducts.map(product => (
                    <div className="favourites__item card" key={product.id}>
                      <PricesPhone product={product} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="favourites__not h2">
                Not favourites
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
