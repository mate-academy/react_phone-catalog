import classNames from 'classnames';
import { RAM } from '../../enums';
import { getFormattedGBString } from '../../helpers';
import './styles.scss';

type Props = {
  characteristics: { [key: string]: string | string[] },
  className?: string,
};

export const Characteristics: React.FC<Props> = ({
  characteristics, className,
}) => (
  <div className={classNames(className, 'characteristics')}>
    {Object.entries(characteristics).map(([name, value]) => (
      <div
        key={name}
        className="characteristics__item"
      >
        <div className="characteristics__name">
          {name === RAM
            ? name.toUpperCase()
            : name}
        </div>

        <div className="characteristics__value">
          {Array.isArray(value)
            ? value.join(', ')
            : getFormattedGBString(value)}
        </div>
      </div>
    ))}
  </div>
);
