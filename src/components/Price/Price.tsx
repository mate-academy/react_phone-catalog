import './Price.scss';

type Props = {
  price: {
    fullPrice: number;
    price: number;
  };
  discount: boolean;
  size?: 's' | 'm';
};

export const Price: React.FC<Props> = ({
  price,
  discount,
  size = 's',
}) => {
  return (
    <div className={`price-block price-block--${size}`}>
      <span className="price">{`$ ${price.price}`}</span>
      {discount && (
        <span className="price price--old">
          {`$ ${price.fullPrice}`}
        </span>
      )}
    </div>
  );
}
