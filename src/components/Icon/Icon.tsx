import cn from 'classnames';
import { Icons } from '../../types/enums/Icons';
import './Icon.scss';

interface Props {
  icon: Icons,
  counter?: number,
}

export const Icon: React.FC<Props> = ({ icon, counter = 0 }) => (
  <div className="icon">
    <span
      className={cn('icon__image', {
        [`icon__image-${icon}`]: icon,
      })}
    />
    {counter > 0 && (
      <span className="icon__counter">
        {counter}
      </span>
    )}
  </div>
);
