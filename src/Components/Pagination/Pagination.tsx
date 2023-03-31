import classNames from 'classnames';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAmountPages } from '../../helpers/utils/getAmountPages';

type Props = {
  amount: number,
};

export const Pagination: FC<Props> = ({ amount }) => {
  const amountPage = getAmountPages(amount);
  const [searchParams, setSearchParams] = useSearchParams();

  const activePage = searchParams.get('page') || '1';

  const setSearchPage = (key: string, value: number) => {
    searchParams.set(key, value.toString());

    setSearchParams(searchParams);
  };

  return (
    <div className="pagination" data-cy="pagination">
      {/* eslint-disable-next-line */}
      <button
        onClick={() => setSearchPage(
          'page',
          +activePage - 1,
        )}
        type="button"
        className="icon icon--left pagination__button"
        data-cy="paginationLeft"
        disabled={+activePage === 1}
      />

      <div className="pagination__pages">
        {amountPage.map(num => (
          <button
            type="button"
            onClick={() => setSearchPage('page', num)}
            key={num}
            className={classNames(
              'pagination__page pagination__button',
              { 'pagination__page--active': num === Number(activePage) },
            )}
          >
            {num}
          </button>
        ))}
      </div>
      {/* eslint-disable-next-line */}
      <button
        onClick={() => setSearchPage(
          'page',
          +activePage + 1,
        )}
        type="button"
        className="icon icon--right pagination__button"
        data-cy="paginationRight"
        disabled={+activePage === amount}
      />
    </div>
  );
};
