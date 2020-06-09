import React, { FC } from 'react';

type Params = {
  options: number;
  setSort: (value: string) => void;
  setActiveTab: (value: number) => void;
  setPosition: (value: number) => void;
  setViewQty: (value: number) => void;
};


export const ItemsSorting: FC<Params> = ({
  setSort,
  setPosition,
  setActiveTab,
  setViewQty,
  options,
}) => {
  // const [dropDown, setDropDown] = useState([]);
  const handleSortView = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
    setPosition(0);
    setActiveTab(1);
  };

  const handleViewQty = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setViewQty(+event.target.value);
    setPosition(0);
    setActiveTab(1);
  };

  const dropDown = (option: number) => {
    if (option < 8) {
      return (
        <option value="4">4</option>
      );
    }

    if (option < 16) {
      return (
        <>
          <option value="4">4</option>
          <option value="8">8</option>
        </>
      );
    }

    return (
      <>
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="16">16</option>
      </>
    );
  };


  return (
    <div className="PhonesCatalog__sorting">
      <div className="PhonesCatalog__sorting_wrapper">
        <span
          className="PhonesCatalog__sorting_title"
        >
          Sort by
        </span>
        <select
          onChange={(event) => handleSortView(event)}
          id="sortBy"
          className="PhonesCatalog__sorting_option"
        >
          <option value="age">Newest</option>
          <option value="name">Alphabetically</option>
          <option value="price_asc">Price Ascending</option>
          <option value="price_desc">Price Descending</option>
        </select>
      </div>
      {options > 4 ? (
        <div className="PhonesCatalog__sorting_wrapper">
          <span
            className="PhonesCatalog__sorting_title"
          >
            Items on page
          </span>
          <select
            onChange={(event) => handleViewQty(event)}
            id="sortQty"
            className="PhonesCatalog__sorting_option"
          >
            {dropDown(options)}
          </select>
        </div>
      ) : ''}
    </div>
  );
};
