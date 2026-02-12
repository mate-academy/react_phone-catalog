import { Link } from 'react-router-dom';
import favouritesStyles from './Favourites.module.scss';
import HeaderLogoMenu from '../HeaderLogoMenu/HeaderLogoMenu';
import { Products } from '../../types/types';
import ViewCart from '../ViewCart';
import Footer from '../Footer';

interface CartProps {
  product: Products[];
}

const Favourites: React.FC<CartProps> = ({ product }) => {
  const overFlowBaheivior = product.length === 0 ? 'hidden' : 'auto';

  return (
    <>
      <HeaderLogoMenu />

      <div
        style={{
          overflow: `${overFlowBaheivior}`,
        }}
      >
        <div className={favouritesStyles['bag-page']}>
          <div className={favouritesStyles['bag-page__path-of-user']}>
            <Link
              to="/"
              className={favouritesStyles['bag-page__go-home-icon']}
            ></Link>

            <span className={favouritesStyles['bag-page__direction']}></span>
            <Link to="/" className={favouritesStyles['bag-page__go-home']}>
              Favourites
            </Link>
          </div>

          <h1 className={favouritesStyles['bag-page__title']}>Favourites</h1>

          <div>{product.length} items</div>

          {product.length === 0 ? (
            <>
              <h3>Favorites list is empty</h3>
              <img
                src="./img/cart-is-empty.png"
                alt=""
                style={{
                  width: '300px',
                  display: 'block',
                  margin: 'auto',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  left: '0',
                }}
              >
                <Footer />
              </div>
            </>
          ) : (
            <div>
              <div className={favouritesStyles['bag-page__list']}>
                {product.map(gadget => {
                  return (
                    <ViewCart
                      gadget={gadget}
                      gadgets={gadget.category}
                      key={gadget.id}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
        {product.length > 0 && <Footer />}
      </div>
    </>
  );
};

export default Favourites;
