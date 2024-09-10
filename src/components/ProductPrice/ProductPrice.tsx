import styles from './ProductPrice.module.scss';
const { price, actual__price, full__price, card__context, page__context } =
  styles;

type ProductPriceProps = {
  fullPrice: number;
  discountedPrice: number;
  discount?: boolean;
  context?: 'card' | 'page';
};

export const ProductPrice = ({
  fullPrice,
  discountedPrice,
  discount,
  context,
}: ProductPriceProps) => {
  const contextClass = context === 'card' ? card__context : page__context;

  return (
    <>
      {!discount ? (
        <h2 className={`${actual__price} ${contextClass}`}>${fullPrice}</h2>
      ) : (
        <div className={price}>
          <h2 className={`${actual__price} ${contextClass}`}>
            ${discountedPrice}
          </h2>

          <h3 className={`${contextClass} ${full__price} `}>${fullPrice}</h3>
        </div>
      )}
    </>
  );
};
