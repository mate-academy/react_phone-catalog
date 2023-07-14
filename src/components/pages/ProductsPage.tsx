import { useLocation, useSearchParams } from 'react-router-dom';
import { useMemo, useContext, useEffect } from 'react';
import { categories } from '../../utils/listsNames';
import { Product } from '../../utils/types/Product';
import {
  PageNavigation,
  ProductCard,
  SelectBlock,
  BlockTitle,
  Loader,
} from '../index';
import { Pagination } from '../Pagination';
import { searchActions } from '../../utils/searchActions';
import { createLoaderList } from '../../utils/createLoaderList';
import { Context } from '../../utils/Context';
import { useDiviceSize } from '../../utils/useDeviceSize/useDiviceSize';

type Props = {
  products: Product[]
};

export const ProductsPage:React.FC<Props> = ({ products }) => {
  const { itemsOnPage } = useDiviceSize();
  const { isLoading } = useContext(Context);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || itemsOnPage[0];
  const Path = useLocation().pathname.slice(1);

  const listByCategory = products.filter(({ category }) => category === Path);
  const developedPages = categories.slice(0, 1);

  const searchObj = {
    sort,
    query,
    page,
    perPage,
  };
  const loaderList = useMemo(() => createLoaderList(+perPage)
    // eslint-disable-next-line react/no-array-index-key
    .map((item, i) => <Loader key={item + i} />), []);
  const listToRender
    = useMemo(() => searchActions(listByCategory, searchObj), [searchObj]);

  const paginationLength = Math.ceil(listByCategory.length / +perPage);

  useEffect(() => {
    if (query) {
      searchParams.set('perPage', query ? 'all' : itemsOnPage[0]);
    }

    if (!query && perPage === 'all') {
      searchParams.delete('perPage');
    }

    setSearchParams(searchParams);
  }, [query]);

  return (
    <main className="products">

      <PageNavigation />
      {developedPages[0] === Path
      && (
        <>
          <BlockTitle
            subtitle={listByCategory.length}
            title={Path.replace(Path[0], Path[0].toUpperCase())}
          />
          <SelectBlock />
        </>
      )}

      {((listToRender.length > 0 || isLoading) && (
        <div className="products__list" data-cy="productList">
          {isLoading
            ? loaderList
            : listToRender.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      ))
      || (
        <BlockTitle
          subtitle={0}
          title={developedPages[0] === Path
            ? 'No matches found'
            : 'Product category will be added soon...'}
        />
      )}

      {listToRender.length !== 0
      && <Pagination paginationLength={paginationLength} />}
    </main>
  );
};
