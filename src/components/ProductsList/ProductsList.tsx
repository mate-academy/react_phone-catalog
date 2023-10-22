import {
  ChangeEvent,
  FC,
  useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import './ProductsList.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product, Sort } from '../../types/Product';
import { getFinalPrice } from '../../helpers/getFinalPrice';
import { Pagination } from '../Pagination/Pagination';

interface Props {
  devices: Product[];
}

export const ProductsList: FC<Props> = ({ devices }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '16';
  const page = searchParams.get('page') || '1';

  const handleSortByChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('sort', event.target.value);
    } else {
      params.delete('sort');
    }

    setSearchParams(params.toString());
  };

  const handlePerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('perPage', event.target.value);
    } else {
      params.delete('perPage');
    }

    setSearchParams(params.toString());
  };

  const handlePageChange = (pageName: string) => {
    const params = new URLSearchParams(searchParams);

    if (pageName) {
      params.set('page', pageName);
    } else {
      params.delete('page');
    }

    setSearchParams(params.toString());
  };

  const sortedByDevices = useMemo(() => {
    return [...devices].sort((a: Product, b: Product) => {
      switch (sortBy) {
        case Sort.Age:
          return a.age - b.age;
        case Sort.Name:
          return a.name.localeCompare(b.name);
        case Sort.Price:
          return getFinalPrice(a.price, a.discount)
          - getFinalPrice(b.price, b.discount);
        default:
          return 0;
      }
    });
  }, [perPage, sortBy]);

  const startIndex = useMemo(() => {
    return (+page - 1) * +perPage;
  }, [page, perPage, sortedByDevices]);

  const endIndex = useMemo(() => {
    return startIndex + +perPage;
  }, [page, perPage, sortedByDevices]);

  return (
    <div className="products-list">
      <div className="products-list__select-wrapper-main">
        <div className="products-list__select-wrapper">
          <p className="products-list__select-title">Sort by</p>
          <select
            className="products-list__select products-list__select--sort"
            value={sortBy}
            onChange={handleSortByChange}
          >
            <option value={Sort.Age}>Newest</option>
            <option value={Sort.Name}>Alphabetically</option>
            <option value={Sort.Price}>Cheapest</option>
          </select>
        </div>

        <div className="products-list__select-wrapper">
          <p className="products-list__select-title">Items on page</p>
          <select
            value={perPage}
            onChange={handlePerPageChange}
            className="products-list__select products-list__select--amount"
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value={devices.length}>all</option>
          </select>
        </div>
      </div>

      <div className="card-container">
        {sortedByDevices
          .slice(startIndex || 0, endIndex || 40)
          .map((device) => (
            <ProductCard key={device.id} product={device} />
          ))}
      </div>

      <Pagination
        total={sortedByDevices.length}
        perPage={perPage}
        handlePageChange={handlePageChange}
        page={page}
      />
    </div>
  );
};
