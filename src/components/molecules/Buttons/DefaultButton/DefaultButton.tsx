import classNames from 'classnames';

import styles from './DefaultButton.module.scss';

export const DefaultButton = ({
  className,
  children,
  type = 'button',
  ...props
}: React.ComponentProps<'button'>) => {
  return (
    <button
      {...props}
      type={type}
      className={classNames(styles.button, className)}
    >
      {children}
    </button>
  );
};
