import { Link } from 'react-router-dom';
import '../styles/Favourites.scss';

export interface NewModel {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
  selectedCapacity?: string;
  selectedColor?: string;
}

interface Props {
  cart: NewModel[];
  addingObjCart: (product: NewModel) => void;
  addingObj: (FavouritesA: NewModel) => void;
  FavouritesA: NewModel[];
}

export const Favourites: React.FC<Props> = ({
  cart,
  addingObjCart,
  addingObj,
  FavouritesA,
}) => {
  return (
    <div className="Favourites">
      <div className="rootline">
        <Link to="/">
          <img src="img/Home.svg" alt="Home" />
        </Link>
        <p className="root__arrow"></p>
        <Link to="/favourites" className="root__thing">
          Favourites
        </Link>
      </div>
      <h1 className="Favouties__header">Favourites</h1>
      <p className="Counter__of__things">{FavouritesA.length} items</p>

      <div className="Phones__List">
        {FavouritesA.map(obj => {
          const isFavorite = FavouritesA.some(cobj => cobj.id === obj.id);
          const isChosen = cart?.some(cobj => cobj.id === obj.id);

          return (
            /* eslint-disable-next-line */
            <div className="Brand__new__phone">
              <div key={obj.id} style={{ textDecoration: 'none' }}>
                <img
                  className="Brand__new__phone__image"
                  src={obj.image}
                  alt={obj.itemId}
                />

                <p className="Brand__new__phone__title">{obj.name}</p>
              </div>

              <div className="Price">
                <span className="this__Price">${obj.price}</span>
              </div>

              <div className="phone__Line"></div>
              <ul className="charasteristics">
                <li className="each">
                  <span className="part__of__List">Screen</span>
                  <span className="part__of__char">{obj.screen}</span>
                </li>
                <li className="each">
                  <span className="part__of__List">Capacity</span>
                  <span className="part__of__char">{obj.capacity}</span>
                </li>
                <li className="each">
                  <span className="part__of__List">RAM</span>
                  <span className="part__of__char">{obj.ram}</span>
                </li>
              </ul>
              <div className="contract__buttons">
                <button
                  type="button"
                  className={isChosen ? 'Added2__to__Cart' : 'Add__to__cart'}
                  onClick={e => {
                    e.stopPropagation();
                    addingObjCart(obj);
                  }}
                >
                  {isChosen ? 'Added to cart' : 'Add to cart'}
                </button>
                <button
                  type="button"
                  className="heart"
                  aria-label="Add to favorites"
                  onClick={e => {
                    e.stopPropagation();
                    addingObj?.(obj);
                  }}
                >
                  {isFavorite ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="#EB5757"
                    >
                      <path
                        /* eslint-disable-next-line */
                        d="M8 13.5L2.5 8C1 6.5 1 4 2.5 2.5C4 1 6.5 1 8 3C9.5 1 12 1 13.5 2.5C15 4 15 6.5 13.5 8L8 13.5Z"
                        stroke="#EB5757"
                        strokeWidth="1.5"
                      />
                    </svg>
                  ) : (
                    /* eslint-disable-next-line */
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        /* eslint-disable-next-line */
                        d="M8 13.5L2.5 8C1 6.5 1 4 2.5 2.5C4 1 6.5 1 8 3C9.5 1 12 1 13.5 2.5C15 4 15 6.5 13.5 8L8 13.5Z"
                        stroke="#313237"
                        strokeWidth="1.5"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
