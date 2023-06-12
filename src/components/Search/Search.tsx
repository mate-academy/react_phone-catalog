import { useLocation } from 'react-router-dom';
import search from '../../Icons/search.svg';
import cross from '../../Icons/closeBlack.svg';
import { Phone } from '../../types/Phone';
import './Search.scss';

type Props = {
  phones: Phone[],
  searchQuery: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  setSearchResults: React.Dispatch<React.SetStateAction<Phone[]>>,
  setPhones: React.Dispatch<React.SetStateAction<Phone[]>>,
};

export const Search: React.FC<Props> = ({
  phones, searchQuery, setSearchQuery, setPhones, setSearchResults,
}) => {
  const location = useLocation();
  const showSearch
    = location.pathname === '/phones'
    || location.pathname === '/tablets'
    || location.pathname === '/accessories'
    || location.pathname === '/favorites';

  if (!showSearch) {
    return null;
  }

  let searchText = '';

  if (location.pathname === '/phones') {
    searchText = 'Search in phones...';
  } else if (location.pathname === '/tablets') {
    searchText = 'Search in tablets...';
  } else if (location.pathname === '/accessories') {
    searchText = 'Search in accessories...';
  } else if (location.pathname === '/favorites') {
    searchText = 'Search in favorites...';
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim().toLowerCase();

    setSearchQuery(query);

    const filteredPhones = phones.filter(
      (phone) => phone.name.toLowerCase().includes(query),
    );

    setPhones(filteredPhones);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setPhones(phones);
    setSearchResults([]);
  };

  return (
    <>
      <div className="search">
        <div className="search__content">
          <input
            type="text"
            placeholder={searchText}
            className="search__input input"
            value={searchQuery}
            onChange={handleSearch}
          />

          <button
            type="button"
            className="search__button button"
            onClick={handleClearSearch}
          >
            {searchQuery ? (
              <img src={cross} alt="cross" className="search__img" />
            ) : (
              <img src={search} alt="search" className="search__img" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};
