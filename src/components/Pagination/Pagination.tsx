import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '../../app/store';
import { setPaginationStatus, setCurrentPage } from '../../features/pagination';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import './Pagination.scss';

const options: (4 | 8 | 16 | 'all')[] = [4, 8, 16, 'all'];

export const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const paginationStatus = useSelector(
    (state: RootState) => state.pagination.paginationStatus,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  const handleOptionClick = (value: 4 | 8 | 16 | 'all') => {
    dispatch(setPaginationStatus(value));
    dispatch(setCurrentPage(1)); // Reset to page 1
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      perPage: value.toString(),
      page: '1',
    });
    setIsOpen(false);
    setHasChanged(true);
  };

  useEffect(() => {
    const perPageParam = searchParams.get('perPage');
    const pageParam = searchParams.get('page');

    // Default to perPage='all' and page='1' if missing
    if (!perPageParam) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        perPage: 'all',
        page: pageParam || '1',
      });
      dispatch(setPaginationStatus('all'));
    } else {
      const parsedPerPage =
        perPageParam === 'all'
          ? 'all'
          : (parseInt(perPageParam, 10) as 4 | 8 | 16);

      dispatch(setPaginationStatus(parsedPerPage));
    }

    const parsedPage = parseInt(pageParam || '', 10) || 1;
    dispatch(setCurrentPage(parsedPage));
  }, [searchParams, dispatch, setSearchParams]);

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <div
          className="select"
          style={{ position: 'relative', userSelect: 'none' }}
        >
          <div
            className={`select__field ${hasChanged ? 'changed' : ''}`}
            data-cy="statusSelect"
            onClick={() => setIsOpen(open => !open)}
          >
            <span className="select__input">{paginationStatus}</span>
            {isOpen ? (
              <IoIosArrowUp color="#89939A" />
            ) : (
              <IoIosArrowDown color="#89939A" />
            )}
          </div>

          {isOpen && (
            <div className="sort__per__page">
              {options.map(option => (
                <div
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className="sort__per__page__option"
                  style={{
                    backgroundColor:
                    paginationStatus === option ? '#E2E6E9' : 'white',
                    color: paginationStatus === option ? '#313237' : '#89939A',
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </p>
    </form>
  );
};

export default Pagination;
