import { useContext } from 'react';
import styles from './ColorSelector.module.scss';
import cn from 'classnames';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { COLOR_MAP } from 'types/ProductColors';
import { ProductDetailsContext } from 'store/ProductDetailsContext';
import useCheckMediaQuery from 'hooks/useCheckMediaQuery';
import { Product } from 'types/Product';

type ColorSelectorProps = {
  products: Product[];
};

export const ColorSelector = ({ products }: ColorSelectorProps) => {
  const { isTablet } = useCheckMediaQuery();
  const { type } = useParams();

  const navigate = useNavigate();

  const { product } = useContext(ProductDetailsContext);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('id');

  const handleColorSelector = (color: string) => {
    if (!product) {
      return;
    }

    const productUrl = `${product.namespaceId}-${product.capacity.toLocaleLowerCase()}-${color}`;

    const productFound = products?.find(
      p =>
        p.itemId === product.id &&
        p.capacity === product.capacity &&
        p.color === product.color,
    );

    navigate(`/${type}/${productUrl}?id=${productFound?.id}`);
  };

  if (!product) {
    return;
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__label}>
        <span className={styles.container__label__info}>Available colors</span>
        {isTablet && productId && (
          <span
            className={styles.container__label__id}
          >{`ID: ${productId}`}</span>
        )}
      </div>
      <div className={styles.container__content}>
        {product.colorsAvailable.map(color => (
          <div
            key={color}
            className={cn(styles.container__content__wrapper, {
              [styles.active]: color === product.color,
            })}
            onClick={() => handleColorSelector(color)}
          >
            <div
              className={styles.container__content__wrapper__item}
              style={{
                backgroundColor: COLOR_MAP[color],
                border: product.name.endsWith(color)
                  ? '2px solid #313237'
                  : 'none',
              }}
              title={color.charAt(0).toUpperCase() + color.slice(1)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
