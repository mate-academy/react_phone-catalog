import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BreadCrumb } from '../../components/Breadcrumb';
import { NoProductsWaring } from '../../components/NoProductsWaring';
import { ProductCard } from '../../components/ProductCard';
import { ProductsContext } from '../../ProductsContext';

export const Favourites = () => {
  const { favProducts } = useContext(ProductsContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const visibleFavProducts = favProducts.filter(product => {
    return product.name.toLocaleLowerCase()
      .includes(query.toLocaleLowerCase());
  });

  return (
    <>
      <div className="section py-3">
        <div className="container">
          <BreadCrumb />
          <h1 className="title has-text-weight-bold">
            Favourietes
          </h1>
          <p className="has-text-grey-light">
            {favProducts.length
              ? `${favProducts.length} models`
              : 'no products yet'}
          </p>
        </div>
      </div>

      {visibleFavProducts.length !== 0
        ? (
          <div className="section">
            <div className="container">

              <div className="
                columns
                is-mobile
                is-multiline
                "
              >
                {visibleFavProducts.map(product => (
                  <div
                    key={product.id}
                    className="
                      column
                      is-one-quarter-desktop
                      is-one-third-tablet
                    "
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

            </div>
          </div>
        )
        : (
          <NoProductsWaring />
        )}
    </>
  );
};
