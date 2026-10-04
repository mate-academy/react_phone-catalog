import { Product } from '@/shared/types/Product';
import { ProductActions } from '../ProductActions';
import style from './ProductInfo.module.scss';
import { useTranslation } from 'react-i18next';

type Spec = {
  key: string;
  value: string | number;
};

type Props = {
  product: Product;
  specs: Spec[];
  price: number;
  fullPrice: number;
  showRegularPriceOnly?: boolean;
};

export const ProductInfo: React.FC<Props> = ({
  specs,
  price,
  fullPrice,
  showRegularPriceOnly,
  product,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <div className={style.pricesBlock}>
          {showRegularPriceOnly ? (
            <div className={style.price}>${fullPrice}</div>
          ) : (
            <>
              <div className={style.price}>${price}</div>
              <div className={style.oldPrice}>${fullPrice}</div>
            </>
          )}
        </div>

        <div className={style.specs}>
          {specs.map(spec => {
            const specForTranlate =
              'product.specs.' + spec.key.toLocaleLowerCase();

            return (
              <div className={style.spec} key={spec.key}>
                <div className={style.spec__key}>{t(specForTranlate)}</div>
                <div className={style.spec__value}>{spec.value}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.actionsWrapper}>
        <ProductActions product={product} />
      </div>
    </>
  );
};
