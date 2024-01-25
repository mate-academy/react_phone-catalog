import { useContext } from 'react';
import { Props } from '../libs/controls-components.type';
import { StateContext } from '../../state-provider/state-context';

export const Cart: React.FC<Props> = ({ className }) => {
  const { cart } = useContext(StateContext);

  const count = cart.length;

  if (count) {
    return (<span className={className}>{count}</span>);
  }

  return null;
};
