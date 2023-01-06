import classNames from 'classnames';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from 'src/utils/helpers/searchHelper';

type Props = {
  currentNumber: number,
  isNumberActive: boolean,
};

export const PaginationNumber: FC<Props> = ({
  currentNumber,
  isNumberActive,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnClick = (current: number) => {
    setSearchParams(
      getSearchWith(searchParams, { page: `${current}` || null }),
    );
  };

  return (
    <button
      type="button"
      className={classNames(
        'pagination__page-number',
        {
          'pagination__page-number--active': isNumberActive,
        },
      )}
      onClick={() => handleOnClick(currentNumber)}
    >
      {currentNumber}
    </button>
  );
};
