import cn from 'classnames';
import { Icons } from '../../types/enums/Icons';
import './Icon.scss';

interface Props {
  icon: Icons,
  counter?: number | undefined,
}

export const Icon: React.FC<Props> = ({ icon, counter }) => (
  <div className="icon">
    <span
      className={cn('icon__image', {
        [`icon__image-${icon}`]: icon,
      })}
    />
    {counter && (
      <span className="font_small icon__counter">
        {counter}
      </span>
    )}
  </div>
);
