import { useState } from 'react';
import './Tabs.scss';

export const Tabs = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="Tab">
      <div className="Tab__menuUnit">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="Tab__form"
        >
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            className="Tab__input"
            placeholder="Search in phones"
            value={search}
          />
          {
            search !== '' ? (
              <button
                onClick={() => {
                  setSearch('');
                }}
                type="button"
                className="Tab__cancelBtn"
              >
                <img
                  src="./assets/close.svg"
                  alt="search"
                  className="Tab__iconClose"
                />
              </button>
            ) : (
              <div className="Tab__searchIcon">
                <img src="./assets/search.svg" alt="searchIcon" />
              </div>
            )
          }
        </form>
      </div>
      <div className="Tab__menuUnit">
        <button type="button" className="Tab__button">
          <img src="./assets/heart.svg" alt="search" />
        </button>
      </div>
      <div className="Tab__menuUnit">
        <button type="button" className="Tab__button">
          <img src="./assets/shoppingBag.svg" alt="shoppingBag" />
        </button>
      </div>
    </div>
  );
};
