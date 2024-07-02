import { useCallback, useContext } from 'react';
import './Catalog.scss';
import { Breadcrumps } from '../Breadcrupmps/Breadcrumps';
import { Filters } from '../Filters/Filters';
import { Products } from '../Products';
import { Pagination } from '../Pagination/Pagination';
import { Product } from '../../../types/Product';
import { ProductContext } from '../Context/Context';
import { useSearchParams } from 'react-router-dom';

type Props = {
  title: string;
  productsByCategory: Product[];
};

export const Catalog: React.FC<Props> = ({ title, productsByCategory }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { path } = useContext(ProductContext);
  const order = searchParams.get('order') || 'Newest';
  const length = searchParams.get('length') || 16;
  const currentPage = searchParams.get('page') || 1;
  const pageEnd = Math.ceil(productsByCategory.length / +length);
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

    return filteredArr.slice(start, end);
  }, [productsByCategory, order, start, end]);

  return (
    <div className="catalog">
      <Breadcrumps />
      <h1 className="page-title">{title}</h1>
      <p className="catalog-length">{`${productsByCategory.length} models`}</p>
      <Filters
        params={params}
        order={order}
        length={+length}
        setSearchParams={setSearchParams}
      />
      {productsByCategory.length > 0 ? (
        <Products products={filteredProducts()} />
      ) : (
        <h1 className="title-error">There are no {path.slice(1)}</h1>
      )}
      {productsByCategory.length > +length && (
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
