import ProductCard from '../../components/ProductCard';
import Title from '../../components/Title';
import style from './FavoritePage.module.scss';
import EmptyFavorite from '../../components/EmptyFavorite';
import { useAppSelector } from '../../redux/hooks';
import { Link } from 'react-router-dom';

const FavoritePage = () => {
  const { favorites } = useAppSelector(state => state.favorites);

  const showProducts = favorites.map(item => (
    <ProductCard key={item.id} product={item} />
  ));

  return favorites.length === 0 ? (
    <EmptyFavorite />
  ) : (
    <section className={style.favorite}>
      <div className="container">
        <div className={style.path}>
          <Link to="/" className={style.pathHome}>
            <img src="./img/icons/home.svg" alt="Home" />
          </Link>
          <img
            className={style.pathArrow}
            src="./img/icons/arrow-right.svg"
            alt="Arrow"
          />
          <Link to="/favorite" className={style.pathText}>
            Favorites
          </Link>
        </div>

        <Title text="Favorites" />

        <h4 className={style.subtitle}>{favorites.length} items</h4>

        <div className={style.products}>{showProducts}</div>
      </div>
    </section>
  );
};

export default FavoritePage;
