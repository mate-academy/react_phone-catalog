import { FC, useContext } from 'react';
import cn from 'classnames';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Styles } from '../../types/Styles';

const {
  Loader: loader,
  'Loader--dark': loaderDark,
}: Styles = require('./Loader.module.scss');

type Props = {
  className?: string;
};

export const Loader: FC<Props> = ({ className = '' }) => {
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <div className={cn(
      loader,
      { [loaderDark]: isThemeDark },
      className,
    )}
    />
  );
};

Loader.defaultProps = {
  className: '',
};
