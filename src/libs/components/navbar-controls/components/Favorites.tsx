import { useContext } from 'react';
import { Props } from '../libs/controls-components.type';
import { StateContext } from '../../state-provider/state-context';

export const Favorites: React.FC<Props> = ({ className }) => {
  const { favorites } = useContext(StateContext);

  const count = favorites.length;

  if (count) {
    return (<span className={className}>{count}</span>);
  }

  return null;
};
