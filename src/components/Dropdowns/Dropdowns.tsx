import { useSearchParams } from 'react-router-dom';
import './Dropdowns.scss';
import { getSearchWith } from '../../utils/searchHelper';
import { useState } from 'react';

export const Dropdowns = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const perpage = searchParams.get('perpage') || '';

  const [sortselecting, setSortSelecting] = useState(false);
  const [itemsselecting, setItemsSelecting] = useState(false);

  const handleSortChange = (event: string | null) => {
    const newSearchParams = getSearchWith(searchParams, {
      sort: event || null,
    });

    setSearchParams(newSearchParams.toLocaleLowerCase());
    setSortSelecting(false);
  };

  const handlePageChange = (event: string | null) => {
    const newSearchParams = getSearchWith(searchParams, {
      perpage: event || null,
      page: event ? '1' : null,
    });

    setSearchParams(newSearchParams.toLowerCase());
    setItemsSelecting(false);
  };

  return (
    <div className="dropdowns">
      <div className="sort__dropdown dropdown">
        <p className="dropdown__description">Sort by</p>

        <div className="dropdown__list">
          <button
            className="dropdown__select"
            onClick={() => setSortSelecting(!sortselecting)}
          >
            {sort ? sort[0].toUpperCase() + sort.slice(1) : 'Newest'}
          </button>
          {sortselecting && (
            <ul className="dropdown__options">
              <li
                className="dropdown__option"
                onClick={event =>
                  handleSortChange(event.currentTarget.textContent)
                }
              >
                Newest
              </li>
              <li
                className="dropdown__option"
                onClick={event =>
                  handleSortChange(event.currentTarget.textContent)
                }
              >
                Alphabetically
              </li>
              <li
                className="dropdown__option"
                onClick={event =>
                  handleSortChange(event.currentTarget.textContent)
                }
              >
                Cheapest
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="items__dropdown dropdown">
        <p className="dropdown__description">Items on page</p>
        <div className="dropdown">
          <button
            className="dropdown__select"
            onClick={() => setItemsSelecting(!itemsselecting)}
          >
            {perpage ? perpage : 'All'}
          </button>
          {itemsselecting && (
            <ul className="dropdown__options">
              <li
                className="dropdown__option"
                onClick={event =>
                  handlePageChange(event.currentTarget.textContent)
                }
              >
                4
              </li>
              <li
                className="dropdown__option"
                onClick={event =>
                  handlePageChange(event.currentTarget.textContent)
                }
              >
                8
              </li>
              <li
                className="dropdown__option"
                onClick={event =>
                  handlePageChange(event.currentTarget.textContent)
                }
              >
                16
              </li>
              <li
                className="dropdown__option"
                onClick={() => handlePageChange(null)}
              >
                All
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
