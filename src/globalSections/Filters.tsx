import classNames from 'classnames';
import {
  FC, useEffect, useRef, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { HistoryStepIcon } from 'src/components/Icons/HistoryStepIcon';
import { Product } from 'src/types/Product';
import { SortBy } from 'src/types/SortBy';
import { capitalize } from 'src/utils/shortHands';
import { FilterList } from './FilterList';

const fromNameToProps: SortBy = {
  Newest: 'age',
  Alphabetically: 'name',
  Cheapest: 'price',
};

const fromPropsToName: SortBy = {
  age: 'Newest',
  name: 'Alphabetically',
  price: 'Cheapest',
};

type Props = {
  isSort: boolean,
  dropDownContent: string[],
  title: string,
  typeProducts: Product[],
};

export const Filters: FC<Props> = ({
  isSort,
  dropDownContent,
  title,
  typeProducts,
}) => {
  const [searchParams] = useSearchParams();
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const dropDownElement = useRef<HTMLDivElement | null>(null);
  const perPage = searchParams.get('perPage') || 'All';
  const sort = searchParams.get('sort') || 'age';

  const handleOnBlur = (event: MouseEvent) => {
    if (!dropDownElement.current?.contains(event.target as HTMLElement)) {
      setIsDropdown(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOnBlur);

    return () => window.removeEventListener('click', handleOnBlur);
  });

  return (
    <div className="products-section__filters">
      <div className="dropdown-section">
        <div className="dropdown-section__title">
          {title}
        </div>

        <div className={classNames(
          'dropdown-section__dropdown',
          { 'dropdown-section__dropdown--active': isDropdown },
        )}
        >
          <div
            role="button"
            aria-hidden
            ref={dropDownElement}
            className={classNames(
              'dropdown-section__trigger',
              { 'dropdown-smaller-w': !isSort },
            )}
            onClick={() => setIsDropdown(prev => !prev)}
          >
            <button
              type="button"
              className="dropdown-section__button"
            >
              <span className="dropdown-section__name">
                {isSort
                  ? capitalize(fromPropsToName[sort])
                  : capitalize(perPage)}
              </span>

              <div className="dropdown-section__icon">
                <HistoryStepIcon />
              </div>
            </button>
          </div>

          <div className={classNames(
            'dropdown-section__content',
            { 'dropdown-smaller-w': !isSort },
          )}
          >
            <FilterList
              dropDownContent={dropDownContent}
              setIsDropdown={setIsDropdown}
              isSort={isSort}
              fromNameToProps={fromNameToProps}
              typeProducts={typeProducts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
