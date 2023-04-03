import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Dropdown } from '../Dropdown';
import { Loader } from '../Loader';
import { NoResults } from '../NoResults';
import { NoSearchResults } from '../NoSearchResults';
import { Pagination } from '../Pagination';
import {
  getPerPageFromSearch,
  handleProductsFilter,
} from '../../helpers/calc/helper';
import { ItemsOnPage } from '../../types/ItemsOnPage';
import { Product } from '../../types/Product';
import { SortTypes } from '../../types/SortTypes';
import './style.scss';
import { Breadcrumbs } from '../Breadcrumbs';

const sortOptions = Object.values(SortTypes);
const ItemsOnPageOptions = Object.values(ItemsOnPage);

type ProductPageProps = {
  title: string;
  getProducts: () => Promise<Product[]>;
};

type SetFunctionType = (products: Product[]) => void;
type GetProductsType = () => Promise<Product[]>;

const fetchProducts = async (
  setFunction: SetFunctionType,
  getProducts: GetProductsType,
) => {
  const productsFromServer = await getProducts();

  setFunction(productsFromServer);
};

export const ProductPage: React.FC<ProductPageProps> = ({
  title,
  getProducts,
}) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [serchParams] = useSearchParams();
  const { pathname } = useLocation();

  useEffect(() => {
    fetchProducts(setProducts, getProducts);
  }, []);

  const currentPage = serchParams.get('page') || 1;

  const hasProducts = products !== null;
  const filteredProducts = handleProductsFilter(products || [], serchParams);
  const isInitialProductsEmpty = products?.length === 0 && hasProducts;
  const isFilteredProductsEmpty
    = filteredProducts?.length === 0 && !isInitialProductsEmpty;
  const itemsPerPage = getPerPageFromSearch(serchParams, filteredProducts);

  return (
    <section className="products">
      <Breadcrumbs pathes={[pathname]} />
      <div className="products__header">
        <h2 className="products__title title title--large">{title}</h2>
        {hasProducts && (
          <p className="products__quantity">{`${products.length} models`}</p>
        )}
      </div>

      {isInitialProductsEmpty ? (
        <NoResults category={title} />
      ) : (
        <div className="products__filter">
          <div className="dropdown">
            <Dropdown
              options={sortOptions}
              title="Sort by"
              searchName="sort"
            />
          </div>

          <div className="dropdown">
            <Dropdown
              options={ItemsOnPageOptions}
              title="Items on page"
              searchName="perPage"
            />
          </div>
        </div>
      )}

      {products ? (
        <div className="products__list">
          <Pagination
            products={filteredProducts}
            perPage={itemsPerPage}
            currentPage={+currentPage}
          />
        </div>
      ) : (
        <Loader />
      )}

      {isFilteredProductsEmpty && <NoSearchResults />}
    </section>
  );
};
