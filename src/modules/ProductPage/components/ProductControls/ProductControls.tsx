// components/ProductInfo/ProductInfo.tsx
import classNames from 'classnames/bind';

import type {
  ProductDetails,
  VariantChange,
} from '../../../../types/ProductDetails';
import { COLOR_HEX, DEFAULT_COLOR_HEX } from '../../../../constants/colors';
import { Button } from '../../../../components/Ui/Button';
import { WishlistButton } from '../../../../components/Ui/WishlistButton';
import styles from './ProductControls.module.scss';

const cx = classNames.bind(styles);

type Props = {
  product: ProductDetails;
  onVariantChange: (change: VariantChange) => void;
};

export const ProductFunc = ({ product, onVariantChange }: Props) => {
  const {
    colorsAvailable,
    color,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    processor,
    ram,
  } = product;

  const specs = [
    { label: 'Screen', value: screen },
    { label: 'Resolution', value: resolution },
    { label: 'Processor', value: processor },
    { label: 'RAM', value: ram },
  ];

  return (
    <div className={cx('product-controls')}>
      <section className={cx('product-controls__section')}>
        <div className={cx('product-controls__title')}>Available colors</div>

        <div className={cx('product-controls__colors')}>
          {colorsAvailable.map(item => {
            const isActive = item === color;

            return (
              <button
                key={item}
                type="button"
                className={cx('product-controls__color', {
                  'product-controls__color--active': isActive,
                })}
                aria-label={item}
                aria-pressed={isActive}
                title={item}
                onClick={() => !isActive && onVariantChange({ color: item })}
              >
                <span
                  className={cx('product-controls__color-dot')}
                  // eslint-disable-next-line max-len
                  style={{
                    backgroundColor: COLOR_HEX[item] ?? DEFAULT_COLOR_HEX,
                  }}
                />
              </button>
            );
          })}
        </div>
      </section>

      <hr className={cx('product-controls__divider')} />

      <section className={cx('product-controls__section')}>
        <div className={cx('product-controls__title')}>Select capacity</div>

        <div className={cx('product-controls__capacities')}>
          {capacityAvailable.map(item => {
            const isActive = item === capacity;

            return (
              <button
                key={item}
                type="button"
                className={cx('product-controls__capacity', {
                  'product-controls__capacity--active': isActive,
                })}
                aria-pressed={isActive}
                onClick={() => !isActive && onVariantChange({ capacity: item })}
              >
                {item.replace(/(\d+)\s*(GB|TB)/i, '$1 $2')}
              </button>
            );
          })}
        </div>
      </section>

      <hr className={cx('product-controls__divider')} />

      <div className={cx('product-controls__prices')}>
        <div className={cx('product-controls__price')}>${priceDiscount}</div>

        {priceRegular > priceDiscount && (
          <div className={cx('product-controls__old-price')}>
            ${priceRegular}
          </div>
        )}
      </div>

      <div className={cx('product-controls__buttons')}>
        <Button onClick={() => {}} textAfterClick="Added">
          Add to cart
        </Button>
        <WishlistButton selected={false} onClick={() => {}} />
      </div>

      <dl className={cx('product-controls__specs')}>
        {specs.map(({ label, value }) => (
          <div key={label} className={cx('product-controls__spec')}>
            <dt className={cx('product-controls__spec-label')}>{label}</dt>
            <dd className={cx('product-controls__spec-value')} title={value}>
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
