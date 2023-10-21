import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelpers';
import './PaginateLink.scss';

type PropTypes = {
  value: string
  defaultPage: string
  quantity?: number;
};

export const PaginateLink: React.FC<PropTypes> = ({
  value,
  defaultPage,
  quantity,
}) => {
  const [searchParams] = useSearchParams();

  const isAll = value === 'All';

  const getSearchWithItemsPerPage = (itemsPerPage: string) => {
    if (isAll) {
      return getSearchWith(searchParams, {
        page: defaultPage,
        perPage: `${quantity}`,
      });
    }

    if (itemsPerPage && !isAll) {
      return getSearchWith(searchParams, {
        page: defaultPage,
        perPage: itemsPerPage,
      });
    }

    return getSearchWith(searchParams, {
      perPage: null,
    });
  };

  return (
    <Link
      className="paginate"
      to={{
        search: getSearchWithItemsPerPage(value),
      }}
    >
      {value}
    </Link>
  );
};
