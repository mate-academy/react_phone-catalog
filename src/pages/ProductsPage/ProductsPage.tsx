import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filtration } from '../../components/Filtration';
import { ProductsList } from '../../components/ProductsList';
import { ProductsContext } from '../../context/ProductsContext';
import { getProductsByType } from '../../helpers/getProductsByType';
import { Title } from '../../components/Title';
import './ProductsPage.scss';
import { HistoryLinks } from '../../components/HistoryLinks';
import { ItemType } from '../../types/Item';
import { getFilteredProducts } from '../../helpers/getFilteredProducts';
import { Loader } from '../../components/Loader';
import { getSortedProducts } from '../../helpers/getSortedProducts';
import { getProductsByPage } from '../../helpers/getProductsByPage';
import { setDebounce } from '../../helpers/setDebounce';
import { Sort } from '../../types/others/types';

type Props = {
  type: ItemType;
  title: string;
  link: string;
};

export const ProductsPage: React.FC<Props>
  = ({ type, title, link }) => {
    const { products, isLoading, setIsLoading } = useContext(ProductsContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const typeProducts = useMemo(() => getProductsByType(products, type),
      [products, type]);

    const [productsToDisplay, productsCount] = useMemo(() => {
      const query = searchParams.get('query')?.toLowerCase() || '';
      const page = searchParams.get('page') || 1;
      const sort = searchParams.get('sort') || 'age';
      const perPage = searchParams.get('perPage') || 16;

      let filtredProducts = getFilteredProducts(typeProducts, query);
      const count = filtredProducts.length;

      filtredProducts = getSortedProducts(filtredProducts, sort as Sort);

      let perPageValue = +perPage;

      if (Number.isNaN(perPageValue)) {
        perPageValue = Number.MAX_SAFE_INTEGER;
      }

      return [getProductsByPage(filtredProducts, +page, perPageValue), count];
    }, [typeProducts, searchParams]);

    const getModelsParagraph = useCallback(() => {
      if (isLoading) {
        return 'Loading...';
      }

      if (productsToDisplay.length) {
        return `${productsCount} models`;
      }

      return 'No models';
    }, [productsCount, productsToDisplay.length, isLoading]);

    const debounce = useCallback(setDebounce(), []);

    useEffect(() => {
      setIsLoading(true);
      debounce(() => setIsLoading(false));

      const page = searchParams.get('page');
      const perPage = searchParams.get('perPage') || '16';

      if (page) {
        if (+page < 1
          || +page > Math.ceil(productsCount / +perPage)) {
          searchParams.delete('page');
          setSearchParams(searchParams);
        }
      }
    }, [searchParams]);

    return (
      <div className="ProductsPage">
        <HistoryLinks
          links={[
            { title: link, link: `/${link}` },
          ]}
        />
        <div className="ProductsPage__title">
          <Title title={title} />
          <p className="ProductsPage__title-count">
            {getModelsParagraph()}
          </p>
        </div>
        {isLoading && <Loader />}
        {(!!productsToDisplay.length && !isLoading) && (
          <Filtration total={productsCount}>
            <ProductsList products={productsToDisplay} />
          </Filtration>
        )}
      </div>
    );
  };
