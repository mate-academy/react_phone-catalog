import scss from './Shop.module.scss';

interface Props {
  category: string;
  name: string;
  amount: number;
  background: string;
}

export const Shop: React.FC<Props> = ({
  category,
  name,
  amount,
  background,
}) => {
  return (
    <a className={scss.shopLink} href={`/${category}`}>
      <div
        className={scss.shopLink__media}
        style={{ backgroundColor: background }}
      >
        <img
          src={`/img/category-${category}.png`}
          alt=""
          className={scss.shopLink__image}
        />
      </div>
      <div className={scss.shopLink__wrapper}>
        <span className={scss.shopLink__title}>{name}</span>
        <span className={scss.shopLink__counter}>{`${amount} models`}</span>
      </div>
    </a>
  );
};
