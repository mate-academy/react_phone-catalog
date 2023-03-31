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
import { getAccessories } from '../../helpers/utils/API';
import { getVisibleProduct } from '../../helpers/utils/GetVisibleProducts';
import { getSearchProducts } from '../../helpers/utils/searchHelper';
/* eslint-disable-next-line */
import { ProductCardInfo } from '../../Components/ProductCardInfo/ProductCardInfo';
/* eslint-disable-next-line */
import { getLinkForProductCard } from '../../helpers/utils/getLinkForProductCard';

type Props = {
  favoriteProducts: Product[],
  setFavorite: (item: Product) => void,
  selectedProducts: Product[],
  setSelectedProducts: (item: Product) => void,
};

export const AccessoriesPage: FC<Props> = ({
  favoriteProducts,
  setFavorite,
  selectedProducts,
  setSelectedProducts,
}) => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const sortBy = searchParams.get('sortBy') || 'age';
  const itemsPerPage = searchParams.get('perPage') || 'All';
  const page = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';
  const amountPages = itemsPerPage === 'All'
    ? 1
    : Math.ceil(accessories.length / +itemsPerPage);

  const visibleAccessories = useMemo(() => getVisibleProduct(
    accessories,
    sortBy,
    +itemsPerPage || accessories.length,
    +page,
  ), [sortBy, accessories, itemsPerPage, page]);

  const fetchAccessories = async () => {
    try {
      setIsError(false);
      setIsLoad(true);
      const accessoriesFromAPI = await getAccessories();

      setAccessories(accessoriesFromAPI);
    } catch {
      setIsError(true);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  if (isLoad) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Notification message="Something went wrong" />
    );
  }

  if (!accessories.length) {
    return <NoResult message="Accessories not found" />;
  }

  if (query) {
    return (
      <SearchProducts
        products={getSearchProducts(accessories, query)}
        setSelectedProducts={setSelectedProducts}
        selectedProducts={selectedProducts}
        favoriteProducts={favoriteProducts}
        setFavorite={setFavorite}
      />
    );
  }

  return (
    <div className="productPage">
      <History pages={['Accessories']} />
      <h1 className="productPage__title">Tablets</h1>
      <p className="productPage__subTitle">{`${accessories.length} models`}</p>

      <SortForm />

      <div className="productPage__productList" data-cy="productList">
        {visibleAccessories.map(phone => (
          <Link
            to={`/${getLinkForProductCard(phone.type)}/${phone.id}`}
            className="productCard"
            key={phone.id}
            data-cy="cardsContainer"
          >
            <ProductCardInfo
              favoriteProducts={favoriteProducts}
              product={phone}
              setFavorite={setFavorite}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          </Link>
        ))}
      </div>

      <Pagination amount={amountPages} />
    </div>
  );
};
