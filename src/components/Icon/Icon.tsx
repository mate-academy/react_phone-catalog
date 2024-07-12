import classNames from 'classnames';
import { IconList } from './styles/IconList';

import classes from './Icon.module.scss';

type Props = {
  icon: IconList;
  counter?: number;
};

export const Icon: React.FC<Props> = ({ icon, counter = 0 }) => (
  <div
    className={classNames(classes.Icon, {
      [classes['Icon--counter']]: counter,
    })}
  >
    <img src={`img/icons/${icon}.svg`} alt="Icon" />

    {counter > 0 && <div className={classes.Icon__counter}>{counter}</div>}
  </div>
);
