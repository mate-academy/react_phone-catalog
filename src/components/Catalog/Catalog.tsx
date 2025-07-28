import './Catalog.scss';
import { Phone } from '../../../src/types/Phone';

type Props = {
  devices: Phone[];
};

export const Catalog: React.FC<Props> = ({ devices }) => {
  return (
    <div className="catalog">
      <div className="catalog__path">
        <div className="catalog__path--image">
          <div className="catalog__path--image-img">
            <img src="../../../img/Home.png" alt="home" />
          </div>
        </div>
        <div className="catalog__path--arrow">
          <img src="../../../img/arrow-right.png" alt="right" />
        </div>
        <div className="catalog__path--device">Phones</div>
      </div>
      <div className="catalog__title">
        <div className="catalog__title--text"></div>
        <div className="catalog__title--amount">{devices.length} items</div>
      </div>
    </div>
  );
};
