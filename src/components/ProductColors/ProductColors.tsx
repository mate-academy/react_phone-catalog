import { COLOR_MAP } from '../../constants/colorsAvailable';
import { useTranslate } from '../../hooks/useTranslate';
import { ExtendedProduct } from '../../types/ExtendedProduct';
import style from './ProductColors.module.scss';

type Props = {
  product: ExtendedProduct;
  variants: ExtendedProduct[];
  onChange: (productId: string) => void;
};

export const ProductColors: React.FC<Props> = ({
  product,
  variants,
  onChange,
}) => {
  const t = useTranslate();

  return (
    <div className={style.productColors}>
      <p className={style.specTitle}>{t('product.colors')}</p>

      <div className={style.colors}>
        {product.colorsAvailable.map(color => {
          const variant = variants.find(
            v => v.color === color && v.capacity === product.capacity,
          );

          if (!variant) {
            return null;
          }

          return (
            <label key={color} className={style.colorOption}>
              <input
                type="radio"
                name="color"
                value={color}
                checked={product.color === color}
                className={style.colorInput}
                onChange={() => onChange(variant.id)}
              />

              <span
                className={style.colorSwatch}
                style={{ backgroundColor: COLOR_MAP[color] }}
                aria-label={color}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};
