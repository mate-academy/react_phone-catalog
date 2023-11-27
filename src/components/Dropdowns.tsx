import { DropdownButton, Dropdown } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { SortBy } from '../utils/types/SortBy';
import { useDiviceSize } from '../utils/useDeviceSize/useDiviceSize';

export const Dropdowns = () => {
  const { itemsOnPage } = useDiviceSize();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage');

  const handleSetSearchParams = (item: string, value: string) => {
    searchParams.set(item, value.toLowerCase());
    if (item === 'perPage') {
      searchParams.delete('page');
    }

    setSearchParams(searchParams);
  };

  useEffect(() => setSearchParams(''), [itemsOnPage]);

  return (
    <div className="dropdowns">
      <div className="dropdown__wrap">
        <p className="mb-1 dropdown__lable"> Sort by</p>
        <DropdownButton
          id="dropdown-item-button"
          title={`${sort?.replace(sort[0], sort[0].toLocaleUpperCase())
        || SortBy.Newest}`}
        >
          {Object.values(SortBy).map(item => (
            <Dropdown.Item
              as="button"
              onClick={() => handleSetSearchParams('sort', item)}
            >
              {item}

            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>

      <div className="dropdown__wrap">
        <p className="mb-1 dropdown__lable"> Items on page</p>
        <DropdownButton id="dropdown-item-button" title={`${perPage || itemsOnPage[0]}`}>
          {itemsOnPage.map(item => (
            <Dropdown.Item
              as="button"
              onClick={() => handleSetSearchParams('perPage', item)}
            >
              {item}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>

    </div>
  );
};
