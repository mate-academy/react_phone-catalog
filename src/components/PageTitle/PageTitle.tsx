import { FC, ReactNode, useContext } from 'react';
import cn from 'classnames';
import { Styles } from '../../types/Styles';
import { ThemeContext } from '../../contexts/ThemeContext';

const styles: Styles = require('./PageTitle.module.scss');

const {
  PageTitle: title,
  'PageTitle__item-counter': itemCounter,
  'PageTitle__item-counter--dark': itemCounterDark,
} = styles;

type Props = {
  children: ReactNode;
  className?: string;
  itemsCount?: number;
};

export const PageTitle: FC<Props> = ({
  className = '',
  children,
  itemsCount = 0,
}) => {
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <div className={className}>
      <h1
        className={cn(
          title,
          className,
        )}
      >
        {children}
      </h1>

      {!!itemsCount && (
        <p
          className={cn(
            itemCounter,
            { [itemCounterDark]: isThemeDark },
          )}
        >
          {`${itemsCount} models`}
        </p>
      )}
    </div>
  );
};

PageTitle.defaultProps = {
  itemsCount: 0,
  className: '',
};
