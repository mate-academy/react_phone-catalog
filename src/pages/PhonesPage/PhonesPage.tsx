import './PhonesPage.scss';

import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { NamesByHeader } from '../../types/NamesByHeader';
import { ProductShort } from '../../types/ProductShort';
import { Loader } from '../../components/Loader';
import { Footer } from '../../components/Footer/Footer';
import { WayFromHome } from '../../components/WayFromHome/WayFromHome';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Header } from '../../components/Header/Header';
import { ProductList } from '../../components/ProductList/ProductList';
import { Pagination } from '../../components/Pagination/Pagination';
import { NamesBySections } from '../../types/NamesBySections';
import { getProduct } from '../../api';
import { SearchParams } from '../../types/SearchParams';
import { OptionsForSort } from '../../types/OptionsForSort';
import { NamesByCategories } from '../../types/NamesByCategories';
import { LikeAndCartContext } from '../../helpers/LikeAndCartContext';
import { DEF_PAGE_STEP, DEF_START_PAGE } from '../../helpers/consts';
import { NoResults } from '../../components/NoResults/NoResults';
import {
  FilterForProduct,
} from '../../components/FilterForProduct/FilterForProduct';
import {
  QuantityItemsParagraf,
} from '../../components/QuantityItemsParagraph/QuantityItemsParagraph';
import {
  NoSearchResults,
} from '../../components/NoSearchResults/NoSearchResults';

export const PhonesPage: React.FC = React.memo(() => {
  const { liked, addedToCart } = useContext(LikeAndCartContext);
  const [numLiked, setNumLiked] = useState<number>(liked.length);
  const [numAdded, setNumAdded] = useState<number>(addedToCart.length);

  const [products, setProducts] = useState<ProductShort[]>([]);
  const [errMess, setErrMess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<ProductShort[]>([]);
  const [lastPointOnPage, setLastPointOnPage] = useState<number>(DEF_PAGE_STEP);
  const [searchParams] = useSearchParams();

  const query = searchParams.get(SearchParams.Query) || '';
  const sort = searchParams.get(SearchParams.Sort) || '';
  const shownPerPage = +(searchParams
    .get(SearchParams.ShownCards) || DEF_PAGE_STEP);
  const currentPage = +(searchParams
    .get(SearchParams.PageNumber) || DEF_START_PAGE);

  const totalNumbersPoints = filteredProducts.length;
  const startPointOnPage: number = (+currentPage - 1) * shownPerPage + 1;

  const changeNumberPage = (pageNumber: number) => {
    const newLastPoint = (pageNumber * shownPerPage > totalNumbersPoints)
      ? totalNumbersPoints
      : pageNumber * shownPerPage;

    setLastPointOnPage(newLastPoint);
  };

  const checkAllFiltersParam = () => {
    if (sort !== OptionsForSort.AgeKey
      && sort !== OptionsForSort.NameKey
      && sort !== OptionsForSort.PriceKey) {
      return false;
    }

    if (shownPerPage !== +(OptionsForSort.NumberFour)
      && shownPerPage !== +(OptionsForSort.NumberEight)
      && shownPerPage !== +(OptionsForSort.NumberSixteen)) {
      return false;
    }

    const quantityPages = Math.ceil(totalNumbersPoints / +shownPerPage);

    if (totalNumbersPoints) {
      if (currentPage < 1 || currentPage > quantityPages) {
        return false;
      }
    }

    return true;
  };

  const getFilteredProducts = () => {
    return products
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
      })
      .sort((prA, prB) => {
        switch (sort) {
          case OptionsForSort.AgeKey:
            return prB.year - prA.year;

          case OptionsForSort.NameKey:
            return prA.name.localeCompare(prB.name);

          case OptionsForSort.PriceKey:
            return prA.price - prB.price;

          default: return 0;
        }
      });
  };

  useEffect(() => {
    setIsLoading(true);

    getProduct(NamesByCategories.Phones)
      .then(gotProducts => {
        setProducts(gotProducts);
        setFilteredProducts(gotProducts);
      })
      .catch((mess: Error) => setErrMess(mess.message))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setFilteredProducts(getFilteredProducts());
  }, [sort, query, products]);

  useEffect(() => {
    changeNumberPage(currentPage);
  }, [shownPerPage, filteredProducts]);

  return (
    <>
      <Header
        withSearch={NamesByCategories.Phones}
        quantityLiked={numLiked}
        quantityAdded={numAdded}
      />

      {isLoading && (<Loader />)}
      {!isLoading && !!errMess.length && <ErrorMessage text={errMess} />}
      {!isLoading && !errMess.length && (
        <main id="main" className="container">
          <div className="product-page__way">
            <WayFromHome lastPoint={NamesByHeader.Phones} />
          </div>

          <section className="product-page__section">
            <h1>
              {NamesBySections.Phones}
            </h1>

            {!products.length && (
              <NoResults caterogy={NamesBySections.Tablets} />
            )}

            {!!products.length && checkAllFiltersParam() && (
              <>
                <div className="product-page__paragraph">
                  <QuantityItemsParagraf
                    allProducts={products.length}
                    filteredProducts={filteredProducts.length}
                    queryLength={query.length}
                    productName="model"
                  />
                </div>

                {!!filteredProducts.length && (
                  <section className="product-page__section">
                    <FilterForProduct />

                    <div className="product-page__list">
                      <ProductList
                        numLiked={numLiked}
                        onSetNumLiked={setNumLiked}
                        numAdded={numAdded}
                        onSetNumAdded={setNumAdded}
                        products={filteredProducts
                          .slice(startPointOnPage - 1, lastPointOnPage)}
                      />
                    </div>

                    {filteredProducts.length > shownPerPage && (
                      <div className="product-page__pagination">
                        <Pagination
                          totalPages={totalNumbersPoints}
                          onSetCurrentPage={changeNumberPage}
                        />
                      </div>
                    )}
                  </section>
                )}
              </>
            )}

            {!checkAllFiltersParam() && (
              <div className="product-page__paragraph">
                <NoSearchResults caterogy={NamesBySections.Phones} />
              </div>
            )}
          </section>
        </main>
      )}

      {!isLoading && <Footer />}
    </>
  );
});
