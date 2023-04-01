import {
  FC,
  Dispatch,
  SetStateAction,
} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

type Props = {
  countShow: string;
  sortBy: string;
  setCountShow: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
  setSortBy: Dispatch<SetStateAction<string>>;
};

export const CatalogListMenu: FC<Props> = ({
  countShow,
  sortBy,
  setCountShow,
  setPage,
  setSortBy,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const productsShowQuantity = () => {
    const show = searchParams.get('perPage')?.toString() || '100';

    setCountShow(show);
    setPage(1);

    navigate({
      search: searchParams.toString(),
    });
  };

  const sortProducts = () => {
    const sort = searchParams.get('sortBy')?.toString() || 'newset';

    setSortBy(sort);

    navigate({
      search: searchParams.toString(),
    });
  };

  return (
    <div className="catalog-list__menu">
      <label htmlFor="#">
        Sort By
        <select
          value={sortBy}
          onChange={(e) => {
            searchParams.set('sortBy', e.target.value);

            sortProducts();
          }}
        >
          <option value="newset">New</option>
          <option value="alphabetically">Alphabetically</option>
          <option value="price">Price</option>
        </select>
      </label>

      <label htmlFor="#">
        Show
        <select
          value={countShow}
          onChange={(e) => {
            searchParams.set('perPage', e.target.value);

            productsShowQuantity();
          }}
        >
          <option value="100">all</option>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
        </select>
      </label>
    </div>
  );
};
