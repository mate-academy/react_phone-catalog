/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useMemo } from 'react';
import { ProductList } from '../components/Products/ProductList';
import { TechProductsContext } from '../stores/TechProductsContext';
import { Loader } from '../components/Loader';
import { BreadcrumbsMenu } from '../components/BreadcrumbsMenu/BreadcrumbsMenu';

export const PhonesPage = () => {
  const {
    phones,
    notProductsMessage,
    loading,
    errorMessage,
    getPhones,
    query,
  } = useContext(TechProductsContext);

  useEffect(() => {
    getPhones();
  }, []);

  const filterPhones = useMemo(() => {
    const filterTechProducts = query
      ? phones.filter((product) => {
        return product.name.trim().toLowerCase()
          .includes(query.trim().toLowerCase());
      }) : phones;

    return filterTechProducts;
  }, [phones, query]);

  return (
    <section className="App__products products-page">
      <div className="container">
        <div className="products-page__content">
          {
            !query && (
              <>
                <BreadcrumbsMenu
                  category="Phones"
                />

                <h1 className="products-page__title">
                  Mobile phones
                </h1>

                <h3 className="products-page__count-models">
                  {`${filterPhones.length} models`}
                </h3>
              </>
            )
          }

          {
            loading && (
              <Loader />
            )
          }

          {
            !loading && errorMessage && (
              <h3>{errorMessage}</h3>
            )
          }

          {
            notProductsMessage && (
              <h3>{notProductsMessage}</h3>
            )
          }

          {
            !filterPhones.length && query && (
              <h3>Sorry, no matching results</h3>
            )
          }

          {
            !loading && !errorMessage && !!filterPhones.length && (
              <ProductList products={filterPhones} />
            )
          }
        </div>
      </div>
    </section>
  );
};
