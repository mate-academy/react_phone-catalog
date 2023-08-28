import { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { IconSlideDown, IconSlideUp } from '../../utils/Icons';
import { SortType } from '../../types/SortType';
import { SelectAmountLink, SelectSortLink } from '../../utils/selectLinks';

interface SelectProps {
  title: string;
  searchParam: string;
  selectSortLink: SelectSortLink[] | SelectAmountLink[];
  setSortQuery?: React.Dispatch<React.SetStateAction<SortType>>;
  setProductsPerPage?: React.Dispatch<React.SetStateAction<number>>;
  sortQuery: SortType;
  productsLength?: number;
  productsPerPage?: number;
}

const sortQueryTitle = (query: SortType) => {
  switch (query) {
    case SortType.NAME: {
      return 'Alphabetically';
    }

    case SortType.PRICE_ASC: {
      return 'Cheapest';
    }

    case SortType.PRICE_DESC: {
      return 'Most expensive';
    }

    default:
    case SortType.NEWEST: {
      return 'Newest';
    }
  }
};

const CustomSelect: React.FC<SelectProps> = ({
  selectSortLink,
  setSortQuery,
  setProductsPerPage,
  searchParam,
  title,
  sortQuery,
  productsLength,
  productsPerPage,
}) => {
  const [searchParams] = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [currentSort, setCurrentSort] = useState<string>(
    sortQueryTitle(sortQuery),
  );
  const [
    currentAmount,
    setCurrentAmount,
  ] = useState<string>(productsPerPage ? productsPerPage.toString() : 'All');

  const location = useLocation();

  const generateSelectURL = (value: SortType | string) => {
    const currentParams = searchParams;

    if (currentParams.has(searchParam)) {
      currentParams.set(searchParam, value);
    } else {
      currentParams.append(searchParam, value);
    }

    return `${location.pathname}?${currentParams.toString()}`;
  };

  const handleLinkClick = (link: SelectAmountLink | SelectSortLink) => {
    if (setSortQuery) {
      setSortQuery(link.value as SortType);
      setCurrentSort(link.title);
    }

    if (setProductsPerPage && productsLength) {
      setProductsPerPage(Number(link.value) || productsLength);
      setCurrentAmount(link.value);
    }

    setIsDropdownOpen(false);
  };

  return (
    <div className="custom-select">
      <p
        className="custom-select__caption"
      >
        {title}
      </p>
      <button
        type="button"
        className="custom-select__frame"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <p className="custom-select__current-value">
          {setSortQuery ? currentSort : currentAmount}
        </p>

        <p
          className="custom-select__trigger"
        >
          {isDropdownOpen ? <IconSlideUp /> : <IconSlideDown />}
        </p>
      </button>

      {isDropdownOpen && (
        <ul className="custom-select__options">
          {selectSortLink.map((link) => (
            <li key={link.value} className="custom-select__option">
              <Link
                to={generateSelectURL(link.value)}
                className="custom-select__option--link"
                onClick={() => handleLinkClick(link)}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
