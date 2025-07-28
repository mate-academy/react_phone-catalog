import './NewModels.scss';
import { ProductCard } from '../../ProductCard/ProductCard';
import { Phone } from '../../../../src/types/Phone';

type Props = {
  devices: Phone[];
};

export const NewModels: React.FC<Props> = ({ devices }) => {
  return (
    <div className="new">
      <div className="new__title">
        <div className="new__title--text">Brand new models</div>
        <div className="new__title--arrows">
          <div className="new__title--arrows-arrow">
            <img src="../../img/arrow-left.png" alt="left" />
          </div>
          <div className="new__title--arrows-arrow arrow-active">
            <img src="../../img/arrow-right.png" alt="right" />
          </div>
        </div>
      </div>
      <div className="new__phones">
        {devices.map(phone => {
          return (
            <ProductCard
              key={phone.id}
              image={phone.images[0]}
              name={phone.name}
              priceRegular={phone.priceRegular}
              priceDiscount={0}
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
