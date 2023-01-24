/* eslint-disable @typescript-eslint/no-var-requires */
import { FC, useContext } from 'react';
import cn from 'classnames';
import { Styles } from '../../types/Styles';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Specs } from '../../types/Specs';

const styles: Styles = require('./TechSpecs.module.scss');

const {
  TechSpecs: techSpecs,
  TechSpecs__item: item,
  'TechSpecs__item-title': title,
  'TechSpecs__item-title--dark': titleDark,
} = styles;

type Props = {
  className?: string;
  specs: Specs;
};

export const TechSpecs: FC<Props> = ({ className = '', specs }) => {
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <ul className={cn(
      techSpecs,
      className,
    )}
    >
      {Object.entries(specs).map(([key, value]) => (
        <li
          key={key}
          className={item}
        >
          <span className={cn(
            title,
            { [titleDark]: isThemeDark },
          )}
          >
            {key}
          </span>

          <span>
            {value}
          </span>
        </li>
      ))}
    </ul>
  );
};

TechSpecs.defaultProps = {
  className: '',
};
