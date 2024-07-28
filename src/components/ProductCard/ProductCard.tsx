import style from './ProductCard.module.scss';
import { Product } from '../../types/Product';

type Props = { prod: Product; discount?: boolean };

export const ProductCard: React.FC<Props> = ({ prod, discount = true }) => {
  const specs = [
    { key: 'Screen', value: prod.screen },
    { key: 'Capacity', value: prod.capacity },
    { key: 'Ram', value: prod.ram },
  ];

  return (
    <article className={style.card}>
      <img src={prod.image} className={style.img} />
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
        <div className={style.buttons__like} />
      </div>
    </article>
  );
};
