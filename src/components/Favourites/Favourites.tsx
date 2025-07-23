import { Link } from 'react-router-dom';
import favouritesStyles from './Favourites.module.scss';
import { useMenu } from '../../context/MenuContext';
import { useCart } from '../../context/CartContext';
import HeaderLogoMenu from '../HeaderLogoMenu/HeaderLogoMenu';
// import { useState } from 'react';
import { Products } from '../../types/types';
import cn from 'classnames';

interface CartProps {
  product: Products[];
}

const Favourites: React.FC<CartProps> = ({ product }) => {
  const { isMenuOpen, setIsMenuOpen } = useMenu();
  const { lovelyProducts, setLovelyProducts } = useCart();
  // const [chosenProduct, setChosenProduct] = useState<>([]);

  const favoritesArray: Products[] | [] = JSON.parse(
    localStorage.getItem('favorites') || '[]',
  );

  console.log(product);

  const addProductToLovely = (productItem: Products) => {
    if (lovelyProducts.some(item => item.itemId === productItem.itemId)) {
      const filteredProducts = lovelyProducts.filter(
        item => item.itemId !== productItem.itemId,
      );

      setLovelyProducts(filteredProducts);

      const updatedFavorites = favoritesArray.filter(
        item => item.itemId !== productItem.itemId,
      );

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      setLovelyProducts(currentsProducts => [...currentsProducts, productItem]);
      localStorage.setItem('favorites', JSON.stringify(lovelyProducts));
    }
  };

  // console.log(favoritesArray);

  return (
    <>
      <HeaderLogoMenu isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className={favouritesStyles['bag-page']}>
        <div className={favouritesStyles['bag-page__path-of-user']}>
          <Link
            to="/"
            className={favouritesStyles['bag-page__go-home-icon']}
          ></Link>
          {/* <Link
            to="/cart"
            className={favouritesStyles['bag-page__current-page']}
          ></Link> */}
          <span className={favouritesStyles['bag-page__direction']}></span>
          <Link to="/" className={favouritesStyles['bag-page__go-home']}>
            Favourites
          </Link>
        </div>

        <h1 className={favouritesStyles['bag-page__title']}>Favourites</h1>

        <div>{product.length} items</div>

        <div className={favouritesStyles['bag-page__list']}>
          {product.map(gadget => {
            return (
              <div
                key={gadget.id}
                className={favouritesStyles['bag-page__card']}
              >
                <a
                  href="#"
                  style={{ backgroundImage: `url('${gadget.image}')` }}
                  className={favouritesStyles['bag-page__image']}
                ></a>

                <div className={favouritesStyles['bag-page__data']}>
                  <div className={favouritesStyles['bag-page__name']}>
                    {gadget.name}
                  </div>
                  <div className={favouritesStyles['bag-page__price']}>
                    ${gadget.fullPrice}
                  </div>

                  <div className={favouritesStyles['bag-page__info']}>
                    <div>Screen</div>
                    <div>{gadget.screen}</div>
                  </div>
                  <div className={favouritesStyles['bag-page__info']}>
                    <div>Capacity</div>
                    <div className={favouritesStyles['bag-page__gb']}>
                      128 GB
                    </div>
                  </div>
                  <div className={favouritesStyles['bag-page__info']}>
                    <div>RAM</div>
                    <div>6 GB</div>
                  </div>

                  <div className={favouritesStyles['bag-page__buttons']}>
                    <button className={favouritesStyles['bag-page__add']}>
                      Add to cart
                    </button>

                    <button
                      className={cn(
                        favouritesStyles['bag-page__lovely-choice'],
                        {
                          [favouritesStyles['bag-page__lovely-choice--active']]:
                            lovelyProducts.some(
                              item => item.itemId === gadget.itemId,
                            ),
                        },
                      )}
                      onClick={() => addProductToLovely(gadget)}
                    ></button>
                  </div>
                </div>

                {/* <div className={favouritesStyles['bag-page__deteils']}>

              </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Favourites;
