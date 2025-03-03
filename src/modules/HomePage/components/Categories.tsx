import { Link } from 'react-router-dom';
import { useProducts } from '../../shared/context/ProductsContext';
import style from './Categories.module.scss';

export const Categories = () => {
  const { phones, tablets, accessories } = useProducts();

  return (
    <>
      <h2 className={style.title}>Shop by category</h2>
      <div className={style.categories}>
        <div className={style.category}>
          <Link to="/phones">
            <img
              src="./img/mobile-phones-category.png"
              className={style.category__image}
            />
          </Link>
          <p className={style.category__name}>Mobile phones</p>
          <p className={style.category__quantity}>{phones.length} models</p>
        </div>

        <div className={style.category}>
          <Link to="/tablets">
            <img
              src="./img/tablets-category.png"
              className={style.category__image}
            />
          </Link>
          <p className={style.category__name}>Tablets</p>
          <p className={style.category__quantity}>{tablets.length} models</p>
        </div>

        <div className={style.category}>
          <Link to="/accessories">
            <img
              src="./img/accessories-category.png"
              className={style.category__image}
            />
          </Link>
          <p className={style.category__name}>Accessories</p>
          <p className={style.category__quantity}>
            {accessories.length} models
          </p>
        </div>
      </div>
    </>
  );
};
