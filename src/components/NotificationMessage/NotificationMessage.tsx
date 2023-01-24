/* eslint-disable @typescript-eslint/no-var-requires */
import { FC, ReactNode, useContext } from 'react';
import cn from 'classnames';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Styles } from '../../types/Styles';

const styles: Styles = require('./NotificationMessage.module.scss');

const {
  NotificationMessage: notification,
  'NotificationMessage--dark': notificationDark,
  NotificationMessage__wrapper: wrapper,
  'NotificationMessage__wrapper--dark': wrapperDark,
  'NotificationMessage--shown': shown,
} = styles;

type Props = {
  className?: string;
  isShown: boolean;
  children?: ReactNode;
};

export const NotificationMessage: FC<Props> = ({
  className = '',
  isShown,
  children = null,
}) => {
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <div className={cn(
      className,
      notification,
      { [notificationDark]: isThemeDark },
      { [shown]: isShown },
    )}
    >
      <div className={cn(
        wrapper,
        { [wrapperDark]: isThemeDark },
      )}
      >
        <p>
          {children
          || 'Sorry, this feature is not implemented yet'}
        </p>
      </div>
    </div>
  );
};

NotificationMessage.defaultProps = {
  className: '',
  children: null,
};
