import { useTranslate } from '../../hooks/useTranslate';
import { ExtendedProduct } from '../../types/ExtendedProduct';
import style from './ProductCapacity.module.scss';

type Props = {
  product: ExtendedProduct;
  variants: ExtendedProduct[];
  onChange: (productId: string) => void;
};

export const ProductCapacity: React.FC<Props> = ({
  product,
  variants,
  onChange,
}) => {
  const t = useTranslate();

  return (
    <div className={style.productCapacity}>
      <p className={style.specTitle}>{t('product.capacities')}</p>

      <div className={style.capacity}>
        {product.capacityAvailable.map(capacity => {
          const variant = variants.find(v => v.capacity === capacity);

          if (!variant) {
            return null;
          }

          return (
            <label key={capacity} className={style.capacityOption}>
              <input
                type="radio"
                name="capacity"
                value={capacity}
                checked={product.capacity === capacity}
                className={style.capacityInput}
                onChange={() => onChange(variant.id)}
              />

              <span className={style.capacitySwatch} aria-label={capacity}>
                {capacity}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
