import './HotPrices.scss';
import { ProductCard } from '../../ProductCard/ProductCard';
import { Phone } from '../../../../src/types/Phone';

type Props = {
  devices: Phone[];
};

export const HotPrices: React.FC<Props> = ({ devices }) => {
  return (
    <div className="hot">
      <div className="hot__title">
        <div className="hot__title--text">Hot prices</div>
        <div className="hot__title--arrows">
          <div className="hot__title--arrows-arrow">
            <img src="../../img/arrow-left.png" alt="left" />
          </div>
          <div className="hot__title--arrows-arrow arrow-active">
            <img src="../../img/arrow-right.png" alt="right" />
          </div>
        </div>
      </div>
      <div className="hot__phones">
        {devices.map(phone => {
          return (
            <ProductCard
              key={phone.id}
              image={phone.images[0]}
              name={phone.name}
              priceRegular={phone.priceRegular}
              priceDiscount={phone.priceDiscount}
              screen={phone.screen}
              capacity={phone.capacity}
              ram={phone.ram}
            />
          );
        })}
      </div>
    </div>
  );
};
