import { useContext, useEffect, useMemo } from 'react';
import { Loader } from '../components/Loader';
import { TechProductsContext } from '../stores/TechProductsContext';
import { ProductList } from '../components/Products/ProductList';
import { BreadcrumbsMenu } from '../components/BreadcrumbsMenu/BreadcrumbsMenu';

export const TabletsPage = () => {
  const {
    tablets,
    notProductsMessage,
    loading,
    errorMessage,
    getTablets,
    query,
  } = useContext(TechProductsContext);

  useEffect(() => {
    getTablets();
  }, []);

  const filterTablets = useMemo(() => {
    const filterTechProducts = query
      ? tablets.filter((product) => {
        return product.name.trim().toLowerCase()
          .includes(query.trim().toLowerCase());
      }) : tablets;

    return filterTechProducts;
  }, [tablets, query]);

  return (
    <section className="App__products products-page">
      <div className="container">
        <div className="products-page__content">
          {
            !query && (
              <>
                <BreadcrumbsMenu
                  category="Tablets"
                />

                <h1 className="products-page__title">
                  Tablets
                </h1>

                <h3 className="products-page__count-models">
                  {`${filterTablets.length} models`}
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
            !loading && !errorMessage && !!filterTablets.length && (
              <ProductList products={filterTablets} />
            )
          }
        </div>
      </div>
    </section>
  );
};
