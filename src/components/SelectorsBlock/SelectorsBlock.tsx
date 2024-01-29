import { useContext } from 'react';
import './selectors-block.scss';
import { MainContext } from '../../context';

export const SelectorsBlock = () => {
  const {
    sortType,
    setSortType,
    itemsOnPage,
    setItemsOnPage,
  } = useContext(MainContext);

  return (
    <div className="selectors__wrapper">
      <div className="select__sort-by">
        <label
          htmlFor="sort-by"
          className="selector__title"
        >
          Sort by
        </label>
        <select
          id="sort-by"
          className="select__field select__field--sort"
          value={sortType}
          onChange={event => setSortType(event.target.value)}
        >
          <option value="No sorting">No sorting</option>
          <option value="Newest">Newest</option>
          <option value="Alphabetically">Alphabetically</option>
          <option value="Cheapest">Cheapest</option>
        </select>
      </div>
      <div className="select__items-on-page">
        <label
          htmlFor="items-on-page"
          className="selector__title"
        >
          Items on page
        </label>
        <select
          id="items-on-page"
          className="select__field select__field--items"
          value={itemsOnPage}
          onChange={event => setItemsOnPage(event.target.value)}
        >
          <option value="All">All</option>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
        </select>
      </div>
    </div>
  );
};
