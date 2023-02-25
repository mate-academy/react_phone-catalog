import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelpers';
import { Product } from '../../types/Product';
import './SortLink.scss';

type PropTypes = {
  sort: keyof Product;
  title: string;
  setDefaultValue: (defaultValue: string) => void;
};

export const SortLink: React.FC<PropTypes> = ({
  sort,
  title,
  setDefaultValue,
}) => {
  const [searchParams] = useSearchParams();
  const isCurrentSort = searchParams.get('sort') === sort;
  const isReversed = searchParams.get('order') === 'desc';

  const getSearchWithSort = (sortBy: keyof Product) => {
    if (!isCurrentSort) {
      return getSearchWith(searchParams, {
        sort: sortBy,
        order: null,
      });
    }

    if (!isReversed) {
      return getSearchWith(searchParams, { order: 'desc' });
    }

    return getSearchWith(
      searchParams,
      {
        sort: null,
        order: null,
      },
    );
  };

  function handleClick(newDefault: string) {
    if (isCurrentSort && isReversed) {
      return setDefaultValue('Choose an option');
    }

    return setDefaultValue(newDefault);
  }

  return (
    <Link
      to={{
        search: getSearchWithSort(sort),
      }}
      className="sortLink"
      onClick={() => handleClick(title)}
    >
      <span>{title}</span>
      <div className={classNames(
        'sortLink__link-icon',
        {
          'sortLink__link-icon--active': isCurrentSort,
          'sortLink__link-icon--cross': isCurrentSort && isReversed,
        },
      )}
      />
    </Link>
  );
};
