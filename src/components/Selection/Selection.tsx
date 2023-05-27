import './Selection.scss';
import { ChangeEvent, useEffect } from 'react';
import { Phone } from '../../types/Phone';

type Props = {
  phones: Phone[],
  setSortedPhones: React.Dispatch<React.SetStateAction<Phone[]>>,
  itemsPerPage: string,
  setItemsPerPage: React.Dispatch<React.SetStateAction<string>>,
  sortOption: string,
  setSortOption: React.Dispatch<React.SetStateAction<string>>,
};

export const Selection: React.FC<Props> = ({
  phones,
  setSortedPhones,
  itemsPerPage,
  setItemsPerPage,
  sortOption,
  setSortOption,
}) => {
  const handleSelectionChange = () => {
    let sorted: Phone[] = [...phones];

    if (sortOption === 'age') {
      sorted = sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name') {
      sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'price') {
      sorted = sorted.sort((a, b) => a.price - b.price);
    }

    if (itemsPerPage !== 'all') {
      sorted = sorted.slice(0, parseInt(itemsPerPage, 10));
    }

    setSortedPhones(sorted);
  };

  useEffect(() => {
    handleSelectionChange();
  }, [sortOption, itemsPerPage]);

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;

    setSortOption(selectedOption);
  };

  const handleItemsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setItemsPerPage(value);
  };

  return (
    <div className="selection">
      <label className="selection__sort selection__sort--text">
        Sort by
        <select
          onChange={handleSortChange}
          className="selection__sort--item select"
          defaultValue=""
        >
          <option value="" disabled>
            Select an option
          </option>
          <option className="select__option" value="name">
            Alphabetically
          </option>
          <option className="select__option" value="age">Newest</option>
          <option className="select__option" value="price">Cheapest</option>
        </select>
      </label>

      <label className="selection__sort selection__sort--text">
        Items on page
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="selection__sort--item"
          defaultValue=""
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="all">All</option>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
        </select>
      </label>
    </div>
  );
};
