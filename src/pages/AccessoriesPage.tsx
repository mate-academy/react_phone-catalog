/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useMemo } from 'react';
import { Loader } from '../components/Loader';
import { TechProductsContext } from '../stores/TechProductsContext';
import { ProductList } from '../components/Products/ProductList';
import { BreadcrumbsMenu } from '../components/BreadcrumbsMenu/BreadcrumbsMenu';

export const AccessoriesPage = () => {
  const {
    accessories,
    notProductsMessage,
    loading,
    errorMessage,
    getAccessories,
    query,
  } = useContext(TechProductsContext);

  useEffect(() => {
    getAccessories();
  }, []);

  const filterAccessories = useMemo(() => {
    const filterTechProducts = query
      ? accessories.filter((product) => {
        return product.name.trim().toLowerCase()
          .includes(query.trim().toLowerCase());
      }) : accessories;

    return filterTechProducts;
  }, [accessories, query]);

  return (
    <section className="App__products products-page">
      <div className="container">
        <div className="products-page__content">
          {
            !query && (
              <>
                <BreadcrumbsMenu
                  category="Accessories"
                />

                <h1 className="products-page__title">
                  Accessories
                </h1>

                <h3 className="products-page__count-models">
                  {`${filterAccessories.length} models`}
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
            !loading && !errorMessage && !!filterAccessories.length && (
              <ProductList products={filterAccessories} />
            )
          }
        </div>
      </div>
    </section>
  );
};
