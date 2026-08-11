import classNames from 'classnames';
import scss from './Shop.module.scss';

interface Props {
  category: string;
  name: string;
  amount: number;
  background: string;
  zoom?: boolean;
}

export const Shop: React.FC<Props> = ({
  category,
  name,
  amount,
  background,
  zoom,
}) => {
  return (
    <a
      className={scss.shopLink}
      href={`${import.meta.env.BASE_URL}${category}`}
      style={{ gridArea: category }}
    >
      <div
        className={scss.shopLink__media}
        style={{ backgroundColor: background }}
      >
        <img
          src={`${import.meta.env.BASE_URL}img/category-${category}.png`}
          alt=""
          className={classNames(scss.shopLink__image, {
            [scss.shopLink__image_zoom]: zoom,
          })}
        />
      </div>
      <div className={scss.shopLink__wrapper}>
        <span className={scss.shopLink__title}>{name}</span>
        <span className={scss.shopLink__counter}>{`${amount} models`}</span>
      </div>
    </a>
  );
};
