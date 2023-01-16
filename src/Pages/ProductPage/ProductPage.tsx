import { useContext, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Crumb } from '../../components/Crumb/Crumb';
import { ItemsPerPageMenu } from '../../components/ItemsPerPageMenu';
import { Pagination } from '../../components/Pagination';
import { ProductCard } from '../../components/ProductCard';
import { SortMenu } from '../../components/SortMenu';
import { ProductsContext } from '../../ProductsContext';
import { Product } from '../../types/Product';
import { NoProductsWaring } from '../../components/NoProductsWaring';

type Props = {
  category: string;
};

export const ProductPage: React.FC<Props> = ({ category }) => {
  const { productsList } = useContext(ProductsContext);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'newest';
  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';
  const products = productsList(category, sort, query);
  const perPage = searchParams.get('perPage') || products.length;
  const indexOfLastItem = +page * +perPage;
  const indexOfFirstItem = indexOfLastItem - +perPage;
  const paginationHidden = +perPage >= products.length;

  const totaItems = useMemo(() => {
    return products.length;
  }, [products]);

  const currentProducts = useCallback((product: Product[]) => {
    return product.slice(indexOfFirstItem, indexOfLastItem);
  }, [products, sort, query, indexOfFirstItem, indexOfLastItem]);

  const title = (value: string) => {
    switch (value) {
      case 'phone':
        return 'Mobile Phones';

      case 'tablet':
        return 'Tablets';

      case 'accessories':
        return 'Accessories';

      default:
        return 0;
    }
  };

  return (
    <>
      <div className="section py-3">
        <div className="container">
          <Crumb />
        </div>
      </div>

      <div className="section">
        <div className="container">
          <h1 className="title has-text-weight-bold">
            {title(category)}
          </h1>
          <p className="has-text-grey-light">
            {products.length
              ? `${products.length} models`
              : 'no products yet'}
          </p>
        </div>
      </div>

      {products.length !== 0
        ? (
          <div className="section">
            <div className="container">

              <div style={{ gap: 16 }} className="is-flex mb-6">
                <SortMenu />
                <ItemsPerPageMenu totaItems={totaItems} />
              </div>

              <div className="
                  columns
                  is-mobile
                  is-multiline
                "
              >
                {currentProducts(products).map(phone => (
                  <div
                    className="
                      column
                      is-one-quarter-desktop
                      is-one-third-tablet
                    "
                    key={phone.id}
                  >
                    <ProductCard product={phone} />
                  </div>
                ))}
              </div>

              {!paginationHidden && (
                <Pagination
                  totalItems={totaItems}
                  itemsPerPage={+perPage}
                />
              )}
            </div>
          </div>
        )
        : (
          <NoProductsWaring />
        )}
    </>
  );
};
