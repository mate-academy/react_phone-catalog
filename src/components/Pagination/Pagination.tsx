import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Phone } from '../../types/Phone';
import './Pagination.scss';

type Props = {
  handleSelect: (key: string, value: string) => URLSearchParams,
  phones: Phone[],
};

export const Pagination: React.FC<Props> = ({ handleSelect, phones }) => {
  const [searchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || '';
  const page = searchParams.get('page') || '';

  const currentPage = page ? +page : 1;
  const currentPerPage = perPage ? +perPage : 16;

  const qntyOfCell = Math.ceil(phones.length / currentPerPage);

  return (
    <div className="pagination" data-cy="pagination">
      <Link
        data-cy="paginationLeft"
        to={{ search: handleSelect('page', `${currentPage - 1}`).toString() }}
        onClick={(event) => currentPage === 1 && event.preventDefault()}
        type="button"
        aria-label="arrow-left"
        className={classNames(
          'arrow arrow--left',
          { 'arrow--left--is-disabled': currentPage === 1 },
        )}
      />

      {phones.map((phone, i) => i < qntyOfCell && (
        <Link
          to={{ search: handleSelect('page', `${i + 1}`).toString() }}
          key={phone.id}
          type="button"
          className={classNames(
            'pagination__btn',
            { 'pagination__btn--is-active': currentPage === i + 1 },
          )}
        >
          {i + 1}
        </Link>
      ))}

      <Link
        data-cy="paginationRight"
        to={{ search: handleSelect('page', `${currentPage + 1}`).toString() }}
        type="button"
        aria-label="arrow-right"
        onClick={(event) => (
          currentPage === qntyOfCell && event.preventDefault()
        )}
        className={classNames(
          'arrow arrow--right',
          { 'arrow--right--is-disabled': currentPage === qntyOfCell },
        )}
      />
    </div>
  );
};
