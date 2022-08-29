import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { usersChoiceContext } from '../../context/UsersChoiceContext';
import { ProductItem } from '../../Components/ProductItem/ProductItem';
import '../../Components/Header/Header.scss';
import './Favourites.scss';

export const Favourites = () => {
  const { likedGadgets } = useContext(usersChoiceContext);

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
          {`${likedGadgets.length} items`}
        </h3>
      </div>
      <div className="Favourites__content">
        {
          likedGadgets.length > 0 && (
            <div className="Favourites__products">
              {
                likedGadgets.map((el) => {
                  return (
                    <ProductItem info={el} />
                  );
                })
              }
            </div>
          )
        }
      </div>
    </div>
  );
};
