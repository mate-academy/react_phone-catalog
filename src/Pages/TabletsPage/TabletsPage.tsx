import {
  FC,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Notification } from '../../Components/Notification/Notification';
import { History } from '../../Components/History/HistoryNav';
import { Loader } from '../../Components/Loader/Loader';
import { NoResult } from '../../Components/NoResult/NoResult';
import { Pagination } from '../../Components/Pagination/Pagination';
import { SearchProducts } from '../../Components/SearchProducts/SearchProducts';
import { SortForm } from '../../Components/SortForm/SortForm';
import { Product } from '../../helpers/types/Product';
import { getTablets } from '../../helpers/utils/API';
import { getVisibleProduct } from '../../helpers/utils/GetVisibleProducts';
import { getSearchProducts } from '../../helpers/utils/searchHelper';
/* eslint-disable-next-line */
import { getLinkForProductCard } from '../../helpers/utils/getLinkForProductCard';
/* eslint-disable-next-line */
import { ProductCardInfo } from '../../Components/ProductCardInfo/ProductCardInfo';

type Props = {
  favoriteProducts: Product[],
  setFavorite: (item: Product) => void,
  selectedProducts: Product[],
  setSelectedProducts: (item: Product) => void,
};

export const TablePage: FC<Props> = ({
  favoriteProducts,
  setSelectedProducts,
  selectedProducts,
  setFavorite,
}) => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const sortBy = searchParams.get('sortBy') || 'age';
  const itemsPerPage = searchParams.get('perPage') || 'All';
  const page = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';
  const amountPages = itemsPerPage === 'All'
    ? 1
    : Math.ceil(tablets.length / +itemsPerPage);

  const visibleTablets = useMemo(() => getVisibleProduct(
    tablets,
    sortBy,
    +itemsPerPage || tablets.length,
    +page,
  ), [sortBy, tablets, itemsPerPage, page]);

  const fetchTablets = async () => {
    try {
      setIsLoad(true);
      setIsError(false);
      const phonesFromAPI = await getTablets();

      setTablets(phonesFromAPI);
    } catch {
      setIsError(true);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    fetchTablets();
  }, []);

  if (isLoad) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Notification message="Something went wrong" />
    );
  }

  if (!tablets.length) {
    return <NoResult message="Tablets not found" />;
  }

  if (query) {
    return (
      <SearchProducts
        products={getSearchProducts(tablets, query)}
        setSelectedProducts={setSelectedProducts}
        selectedProducts={selectedProducts}
        favoriteProducts={favoriteProducts}
        setFavorite={setFavorite}
      />
    );
  }

  return (
    <div className="productPage">
      <History lastPage="Tablets" />
      <h1 className="productPage__title">Tablets</h1>
      <p className="productPage__subTitle">{`${tablets.length} models`}</p>

      <SortForm />

      <div className="productPage__productList" data-cy="productList">
        {visibleTablets.map(phone => (
          <Link
            to={`/${getLinkForProductCard(phone.type)}/${phone.id}`}
            className="productCard"
            key={phone.id}
            data-cy="cardsContainer"
          >
            <ProductCardInfo
              setSelectedProducts={setSelectedProducts}
              selectedProducts={selectedProducts}
              favoriteProducts={favoriteProducts}
              product={phone}
              setFavorite={setFavorite}
            />
          </Link>
        ))}
      </div>

      <Pagination amount={amountPages} />
    </div>
  );
};
