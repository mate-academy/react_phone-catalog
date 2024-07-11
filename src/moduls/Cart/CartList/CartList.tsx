import { Accessorie } from '../../../types/accessories';
import { Phone } from '../../../types/phone';
import { Tablet } from '../../../types/tablets';
import { CartItem } from '../CartItem/CartItem';

import './CartList.scss';

interface Props {
  devices: (Phone | Tablet | Accessorie)[];
}

export const CartList: React.FC<Props> = ({ devices }) => {
  return (
    <div className="CartList">
      {devices.map(d => (
        <CartItem key={d.id} device={d} />
      ))}
    </div>
  );
};
