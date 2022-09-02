import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { usersChoiceContext } from '../../context/UsersChoiceContext';
import { ProductItem } from '../../Components/ProductItem/ProductItem';
import '../../Components/Header/Header.scss';
import './Favourites.scss';
import '../../Components/Gadgets/Gadgets.scss';

type Props = {
  searchInput?: string;
};

export const Favourites: React.FC<Props> = ({ searchInput }) => {
  const { likedGadgets } = useContext(usersChoiceContext);
  const [likedGadgetsCopy, setLikedGadgetsCopy] = useState(likedGadgets);

  useEffect(() => {
    if (searchInput && searchInput !== '') {
      const catalog = likedGadgets
        .filter(el => el.name.toLowerCase().includes(searchInput));

      setLikedGadgetsCopy(catalog);
    } else {
      setLikedGadgetsCopy(likedGadgets);
    }
  }, [likedGadgets, searchInput]);

  return (
    <div className="Favourites">
      <div className="Header Favourites__wrapper">
        <div className="Header__route">
          <Link to="/" className="Header__link">
            <img
              className="Header__svg"
              src="./assets/Home.svg"
              alt="home-icon"
            />
          </Link>
          <img
            className="Header__svg"
            src="./assets/Chevron-arrow-right.svg"
            alt="arrow-right"
          />
          <h3 className="Header__routeText">
            Favourites
          </h3>
        </div>
        <h1 className="Header__PageTitle">
          Favourites
        </h1>
        <h3 className="Header__foundNumber">
          {`${likedGadgetsCopy.length} items`}
        </h3>
      </div>
      <div className="Favourites__content">
        {
          likedGadgetsCopy.length > 0 ? (
            <div className="Favourites__products">
              {
                likedGadgetsCopy.map((el) => {
                  return (
                    <ProductItem info={el} key={el.id} />
                  );
                })
              }
            </div>
          ) : (
            <div className="Favourites__empty">
              <h1 className="Favourites__noSearchRes">No search results</h1>
            </div>
          )
        }
      </div>
    </div>
  );
};
