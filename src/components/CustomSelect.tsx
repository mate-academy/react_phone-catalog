import { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { IconSlideDown, IconSlideUp } from '../utils/Icons';
import { SortType } from '../types/SortType';
import { SelectAmountLink, SelectSortLink } from '../utils/selectLinks';

interface SelectProps {
  title: string;
  searchParam: string;
  selectSortLink: SelectSortLink[] | SelectAmountLink[];
  setSortQuery: React.Dispatch<React.SetStateAction<SortType>> | null;
  setProductsPerPage: React.Dispatch<React.SetStateAction<number>> | null
}

const CustomSelect: React.FC<SelectProps> = ({
  selectSortLink, setSortQuery, setProductsPerPage, searchParam, title,
}) => {
  const [searchParams] = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [currentSort, setCurrentSort] = useState<string>('Newest');
  const [currentAmount, setCurrentAmount] = useState<string>('4');
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
                onClick={() => {
                  if (setSortQuery) {
                    setSortQuery(link.value as SortType);
                    setCurrentSort(link.title);
                  }

                  if (setProductsPerPage) {
                    setProductsPerPage(Number(link.value));
                    setCurrentAmount(link.value);
                  }

                  setIsDropdownOpen(false);
                }}
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
