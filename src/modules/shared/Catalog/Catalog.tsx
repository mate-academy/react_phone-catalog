import { useCallback, useContext, useMemo } from 'react';
import './Catalog.scss';
import { Breadcrumps } from '../Breadcrupmps/Breadcrumps';
import { Filters } from '../Filters/Filters';
import { Products } from '../Products';
import { Pagination } from '../Pagination/Pagination';
import { Product } from '../../../types/Product';
import { ProductContext } from '../Context/Context';

type Props = {
  title: string;
  productsByCategory: Product[];
};

export const Catalog: React.FC<Props> = ({ title, productsByCategory }) => {
  const { path, currentPage, order, setSearchParams, length, params, query } =
    useContext(ProductContext);
  const start = +length * (+currentPage - 1);
  const end = +length * +currentPage;

  const filteredProducts = useCallback(() => {
    let filteredArr = productsByCategory;

    switch (order) {
      case 'Newest':
        filteredArr = filteredArr.sort((productA, productB) => {
          return productA.year - productB.year;
        });
        break;

      case 'Alphabeticaly':
        filteredArr = filteredArr.sort((productA, productB) => {
          return productA.name.localeCompare(productB.name);
        });
        break;

      case 'Cheapest':
        filteredArr = filteredArr.sort((productA, productB) => {
          return productA.price - productB.price;
        });
        break;

      default:
        filteredArr = filteredArr;
        break;
    }

    if (query) {
      filteredArr = filteredArr.filter(item => {
        const reg = new RegExp(query, 'i');

        return reg.test(item.name);
      });
    }

    return filteredArr;
  }, [productsByCategory, order, query]);

  const productsSlice = useMemo(() => {
    return length === 'All'
      ? filteredProducts()
      : filteredProducts().slice(start, end);
  }, [start, end, length, filteredProducts]);

  const pageEnd = Math.ceil(filteredProducts().length / +length);

  return (
    <div className="catalog">
      <Breadcrumps />
      <h1 className="page-title">{title}</h1>
      <p className="catalog-length">{`${productsByCategory.length} models`}</p>
      <Filters
        params={params}
        order={order}
        length={length}
        setSearchParams={setSearchParams}
      />
      {filteredProducts().length > 0 ? (
        <Products products={productsSlice} />
      ) : (
        <h1 className="title-error">There are no {path.slice(1)}</h1>
      )}
      {filteredProducts().length > +length && (
        <Pagination
          pageEnd={pageEnd}
          currentPage={+currentPage}
          params={params}
          setSearchParams={setSearchParams}
        />
      )}
    </div>
  );
};
