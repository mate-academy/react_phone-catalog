import './PhonesPageInfoPrice.scss';

interface Price {
  priceRegular: number,
  priceDiscount: number,
}

interface PriceProps {
  price: Price;
}

export const PhonesPageInfoPrice = ({ price }: PriceProps) => {
  return (
    <>
      <div className="card__prices">
        <h1 className="skid-prices">
          $
          {price.priceDiscount}
        </h1>
        <p className="norm-prices">
          $
          {price.priceRegular}
        </p>
      </div>
    </>
  );
};
