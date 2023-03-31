import {
  FC,
  useState,
  useEffect,
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
import { getPhones } from '../../helpers/utils/API';
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

export const PhonePage: FC<Props> = ({
  setSelectedProducts,
  selectedProducts,
  favoriteProducts,
  setFavorite,
}) => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const sortBy = searchParams.get('sortBy') || 'age';
  const itemsPerPage = searchParams.get('perPage') || 'All';
  const page = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';

  const visiblePhones = useMemo(() => getVisibleProduct(
    phones,
    sortBy,
    +itemsPerPage || phones.length,
    +page,
  ), [sortBy, phones, itemsPerPage, page]);

  const amountPages = itemsPerPage === 'All'
    ? 1
    : Math.ceil(phones.length / +itemsPerPage);

  const fetchPhones = async () => {
    try {
      setIsLoad(true);
      setIsError(false);
      const phonesFromAPI = await getPhones();

      setPhones(phonesFromAPI);
    } catch {
      setIsError(true);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  if (isLoad) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Notification message="Something went wrong" />
    );
  }

  if (!phones.length) {
    return <NoResult message="Phones not found" />;
  }

  if (query) {
    return (
      <SearchProducts
        products={getSearchProducts(phones, query)}
        setSelectedProducts={setSelectedProducts}
        selectedProducts={selectedProducts}
        favoriteProducts={favoriteProducts}
        setFavorite={setFavorite}
      />
    );
  }

  return (
    <div className="productPage">
      <History lastPage="Phone" />
      <h1 className="productPage__title">Mobile phones</h1>
      <p className="productPage__subTitle">{`${phones.length} models`}</p>

      <SortForm />

      <div className="productPage__productList" data-cy="productList">
        {visiblePhones.map(phone => (
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
