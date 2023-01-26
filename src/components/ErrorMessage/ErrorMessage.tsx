import { FC, useContext } from 'react';
import cn from 'classnames';
import { ErrorText } from '../../types/ErrorText';
import { ThemeContext } from '../../contexts/ThemeContext';

const styles = require('./ErrorMessage.module.scss');

const {
  ErrorMessage: errorMessage,
  'ErrorMessage--warn': errorMessageWarn,
  'ErrorMessage--big': errorMessageBig,
  'ErrorMessage--dark': errorMessageDark,
} = styles;

type Props = {
  className?: string;
  message: ErrorText;
  warn?: boolean;
  isBig?: boolean;
};

export const ErrorMessage: FC<Props> = ({
  className = '',
  message,
  warn = false,
  isBig = false,
}) => {
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <div
      className={cn(
        errorMessage,
        { [errorMessageWarn]: warn },
        { [errorMessageDark]: isThemeDark },
        { [errorMessageBig]: isBig },
        className,
      )}
    >
      <p>
        {message}
      </p>
    </div>
  );
};

ErrorMessage.defaultProps = {
  className: '',
  warn: false,
  isBig: false,
};
