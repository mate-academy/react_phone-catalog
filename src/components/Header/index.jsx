import cn from 'classnames';
import { useCallback, useState } from 'react';
import { IoIosMenu, IoMdClose, IoMdHeartEmpty } from 'react-icons/io';
import { LuShoppingBag } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setCategoryId } from '../../redux/slices/categoriesSlice';
import styles from './Header.module.scss';

const categories = [
  'home',
  'phones',
  'tablets',
  'accessories',
  'favorites',
  'bay',
];

export default function Header() {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const { categoryId } = useSelector(state => state.category);
  const favorites = useSelector(state => state.favorites.favorites);
  const bay = useSelector(state => state.bay.bayList);
  const products = useSelector(state => state.products.products);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(prevMenuOpen => {
      const newMenuOpen = !prevMenuOpen;
      document.body.classList.toggle('no-scroll', newMenuOpen);
      return newMenuOpen;
    });
  };

  const onChangeCategory = useCallback(
    idx => {
      dispatch(setCategoryId(idx));
      window.scrollTo(0, 0);
      if (menuOpen) {
        toggleMenu();
      }
    },
    [dispatch, menuOpen, toggleMenu],
  );

  const favoriteProducts = products.filter(product =>
    favorites.includes(product.id),
  );

  const totalBayQuantity = bay.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <header className={styles.root}>
      <div className={styles.topBar}>
        <Link
          to="/"
          onClick={() => {
            onChangeCategory(0);
            window.scrollTo(0, 0);
          }}
        >
          <h5>
            Nice👌 <br /> Gadgets
          </h5>
        </Link>
        <div className={styles.menuToggle} onClick={toggleMenu}>
          <i>{menuOpen ? <IoMdClose size={25} /> : <IoIosMenu size={25} />}</i>
        </div>
      </div>
      <nav className={`${styles.categories} ${menuOpen ? styles.open : ''}`}>
        <ul>
          {categories.slice(0, 4).map((categoryName, i) => (
            <li key={i}>
              <Link
                className={cn({
                  [styles.a__active]: location.pathname === `/${categoryName}`,
                  [styles.a]: location.pathname !== `/${categoryName}`,
                })}
                to={`/${categoryName}`}
                onClick={() => onChangeCategory(i)}
              >
                {categoryName}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.icons}>
          <i
            id="favorites-icon"
            className={categoryId === 4 ? styles.activeIcon : ''}
            onClick={() => onChangeCategory(4)}
          >
            <Link to="/favorites">
              <IoMdHeartEmpty size={24} />
              {favoriteProducts.length > 0 ? (
                <div className={styles.favorite}>
                  <p>{favoriteProducts.length}</p>
                </div>
              ) : (
                ''
              )}
            </Link>
          </i>
          <i
            id="bay-icon"
            className={categoryId === 5 ? styles.activeIcon : ''}
            onClick={() => onChangeCategory(5)}
          >
            <Link to="/bay">
              <LuShoppingBag size={20} />
              {totalBayQuantity > 0 ? (
                <div className={styles.favorite}>
                  <p>{totalBayQuantity}</p>
                </div>
              ) : (
                ''
              )}
            </Link>
          </i>
        </div>
      </nav>
    </header>
  );
}
