import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Header } from '../../components/Header/Header';
import { ProductList } from '../../components/ProductList/ProductList';
import { NamesByCategories } from '../../types/NamesByCategories';
import './FavouritesPage.scss';
import { ProductShort } from '../../types/ProductShort';
import { getFavourites } from '../../api';
import { Loader } from '../../components/Loader/Loader';
import { WayFromHome } from '../../components/WayFromHome/WayFromHome';
import { NamesByHeader } from '../../types/NamesByHeader';
import { NamesBySections } from '../../types/NamesBySections';
import { Footer } from '../../components/Footer/Footer';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { LikeAndCartContext } from '../../helpers/LikeAndCartContext';
import { SearchParams } from '../../types/SearchParams';
import {
  QuantityItemsParagraf,
} from '../../components/QuantityItemsParagraph/QuantityItemsParagraph';
import { MenuWithNav } from '../../components/MenuWithNav/MenuWithNav';

export const FavouritesPage: React.FC = () => {
  const { liked, addedToCart } = useContext(LikeAndCartContext);
  const [numLiked, setNumLiked] = useState<number>(liked.length);
  const [numAdded, setNumAdded] = useState<number>(addedToCart.length);

  const [startProducts, setStartProducts] = useState<ProductShort[]>([]);
  const [errMess, setErrMess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [currentProducts, setCurrentProducts] = useState<ProductShort[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductShort[]>([]);

  const [searchParams] = useSearchParams();
  const query = searchParams.get(SearchParams.Query) || '';

  const getFilteredProducts = () => {
    return currentProducts
      .filter(product => {
        const correctQuery = query.trim().toLocaleLowerCase();
        const {
          name, category, color, capacity, screen, year,
        } = product;

        if (correctQuery) {
          if (category.toLocaleLowerCase().includes(correctQuery)
            || color.toLocaleLowerCase().includes(correctQuery)
            || capacity.toLocaleLowerCase().includes(correctQuery)
            || screen.toLocaleLowerCase().includes(correctQuery)
            || year.toString().toLocaleLowerCase().includes(correctQuery)
          ) {
            return true;
          }

          return name.toLocaleLowerCase().includes(correctQuery);
        }

        return true;
      });
  };

  useEffect(() => {
    setIsLoading(true);

    getFavourites()
      .then(setStartProducts)
      .catch((mess: Error) => setErrMess(mess.message))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setCurrentProducts(startProducts.filter(pr => liked.includes(pr.phoneId)));
  }, [startProducts, numLiked]);

  useEffect(() => {
    setFilteredProducts(getFilteredProducts());
  }, [query, currentProducts]);

  useEffect(() => {
    if (isMenu) {
      document.body.classList.add('body__with-menu');
    } else {
      document.body.classList.remove('body__with-menu');
    }
  }, [isMenu]);

  return (
    <>
      <Header
        withSearchBy={NamesByCategories.Favourites}
        quantityLiked={numLiked}
        quantityAdded={numAdded}
        onSetIsMenu={setIsMenu}
      />

      <div className={classNames('home-page__menu', { visible: isMenu })}>
        <MenuWithNav
          quantityLiked={numLiked}
          quantityAdded={numAdded}
          onSetIsMenu={setIsMenu}
        />
      </div>

      {isLoading && (<Loader />)}
      {!isLoading && !!errMess.length && <ErrorMessage text={errMess} />}
      {!isLoading && !errMess.length && (
        <div className="container">
          <main className="container__content">
            <div className="product-page__way">
              <WayFromHome lastPoint={NamesByHeader.Favourites} />
            </div>

            <section className="product-page__section">
              <h1>
                {NamesBySections.Favourites}
              </h1>

              <div className="product-page__paragraph">
                <QuantityItemsParagraf
                  allProducts={currentProducts.length}
                  filteredProducts={filteredProducts.length}
                  queryLength={query.length}
                />
              </div>

              <div className="product-page__list">
                <ProductList
                  products={filteredProducts}
                  numLiked={numLiked}
                  onSetNumLiked={setNumLiked}
                  numAdded={numAdded}
                  onSetNumAdded={setNumAdded}
                />
              </div>
            </section>
          </main>
        </div>
      )}

      {!isLoading && <Footer />}
    </>
  );
};
