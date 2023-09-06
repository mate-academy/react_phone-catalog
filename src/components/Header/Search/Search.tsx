/* eslint-disable jsx-a11y/control-has-associated-label */
import './Search.scss';

export const Search = () => {
  return (
    <div className="Search">
      <input
        type="text"
        aria-label="search"
        className="Search--input"
        placeholder="Search in {page}"
      />
      <button
        type="button"
        data-cy="searchDelete"
        aria-label="clear-search"
        className="Search--clear-button"
      />
    </div>
  );
};
