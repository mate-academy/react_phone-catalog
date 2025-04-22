import { useContext } from 'react';
import styles from './ColorSelector.module.scss';
import cn from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { COLOR_MAP } from 'types/ProductColors';
import { ProductDetailsContext } from 'store/ProductDetailsContext';
import useCheckMediaQuery from 'hooks/useCheckMediaQuery';
import useIdParams from 'hooks/useIdParams';

export const ColorSelector = () => {
  const { isTablet } = useCheckMediaQuery();
  const { type } = useParams();
  const { id } = useIdParams();
  const navigate = useNavigate();

  const { product } = useContext(ProductDetailsContext);

  const handleColorSelector = (color: string) => {
    if (!product) {
      return;
    }

    const productUrl = `${product.namespaceId}-${product.capacity.toLocaleLowerCase()}-${color}`;

    navigate(`/${type}/${productUrl}`);
  };

  if (!product) {
    return;
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__label}>
        <span className={styles.container__label__info}>Available colors</span>
        {isTablet && (
          <span className={styles.container__label__id}>{`ID: ${id}`}</span>
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
