import style from './ProductCard.module.scss';
import categoryIphone from '../../assets/img/category-phones.webp';

const specs = [
  { key: 'Screen', value: '6.1” OLED' },
  { key: 'Capacity', value: '128 GB' },
  { key: 'RAM', value: '6 GB' },
];

type Props = { discount: boolean };

export const ProductCard: React.FC<Props> = ({ discount }) => (
  <article className={style.card}>
    <img src={categoryIphone} className={style.img} />
    <div className={style.title}>Apple iPhone 14 Pro 128GB Silver (MQ023)</div>
    <div className={style.price}>
      <div className={style.price__actual}>$999</div>
      {discount && <div className={style.price__old}>$1199</div>}
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
