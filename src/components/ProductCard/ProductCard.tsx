import style from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { NavLink } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import cn from 'classnames';

type Props = { prod: Product; discount?: boolean };

export const ProductCard: React.FC<Props> = ({ prod, discount = true }) => {
  const [favourites, setFavourites] = useLocalStorage('favourites', []);

  const specs = [
    { key: 'Screen', value: prod.screen },
    { key: 'Capacity', value: prod.capacity },
    { key: 'Ram', value: prod.ram },
  ];

  const getActiveLike = (product: Product) => {
    return favourites.some((item: Product) => product.id === item.id);
  };

  const handleLike = (product: Product) => {
    if (getActiveLike(product)) {
      setFavourites(
        favourites.filter((item: Product) => item.id !== product.id),
      );
    } else {
      setFavourites([...favourites, product]);
    }
  };

  return (
    <article className={style.card}>
      <NavLink to={prod.itemId} className={style.img__link}>
        <img src={prod.image} className={style.img} />
      </NavLink>
      <div className={style.title}>{prod.name}</div>
      <div className={style.price}>
        <div className={style.price__actual}>
          ${discount ? prod.price : prod.fullPrice}
        </div>
        {prod.fullPrice && discount && (
          <div className={style.price__old}>${prod.fullPrice}</div>
        )}
      </div>
      <div className={style.divider} />
      <div className={style.specs}>
        {specs.map(({ key, value }) => (
          <div className={style.specs__item} key={key}>
            <div className={style.specs__key}>{key}</div>
            <div className={style.specs__value}>{value}</div>
          </div>
        ))}
      </div>
      <div className={style.buttons}>
        <button className={style.buttons__add}>Add to cart</button>
        <div
          className={cn(style.buttons__like, {
            [style['buttons__like--active']]: getActiveLike(prod),
          })}
          onClick={() => handleLike(prod)}
        />
      </div>
    </article>
  );
};
