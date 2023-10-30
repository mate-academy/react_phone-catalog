import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usersChoiceContext } from '../../context/UsersChoiceContext';
import { SearchBar } from '../SearchBar/SearchBar';
import './Tabs.scss';

type Props = {
  location: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

export const Tabs: React.FC<Props> = (
  { location, setSearchInput },
) => {
  const { likedGadgetsID, inCartID } = useContext(usersChoiceContext);
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    if (location === '/phones'
      || location === '/tablets'
      || location === '/favourites'
    ) {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
  }, [location]);

  return (
    <div className="Tab">
      <div className={`Tab__menuUnit Tab__searchBar ${!showSearchBar && 'hidden'}`}>
        <SearchBar location={location} setSearchInput={setSearchInput} />
      </div>
      <div className="Tab__menuUnit heartUnit">
        <Link
          to="/favourites"
          className="Tab__link"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}
        >
          <button
            type="button"
            className={`Tab__button ${location === '/favourites' && 'borderDark'}`}
          >
            {
              likedGadgetsID.length > 0 && (
                <div className="Tab__numberOfLiked">
                  {likedGadgetsID.length}
                </div>
              )
            }
            <img src="./assets/heart.svg" alt="search" />
          </button>
        </Link>
      </div>
      <div className="Tab__menuUnit">
        <Link
          to="/cart"
          className="Tab__link"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}
        >
          <button
            type="button"
            className={`Tab__button ${location === '/cart' && 'borderDark'}`}
          >
            {
              inCartID.length > 0 && (
                <div className="Tab__numberOfLiked">
                  {inCartID.length}
                </div>
              )
            }
            <img src="./assets/shoppingBag.svg" alt="shoppingBag" />
          </button>
        </Link>
      </div>
    </div>
  );
};
