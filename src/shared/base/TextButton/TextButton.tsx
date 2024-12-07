import cn from 'classnames';

import { DefaultPropsChildren } from '@shared/types/common';

import styles from './TextButton.module.scss';
import { Text } from '../Text';

export interface TextButtonProps extends DefaultPropsChildren {
  startAdornment?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  onClick?: VoidFunction;
}

export const TextButton: React.FC<TextButtonProps> = ({
  children,
  className,
  startAdornment: StartAdornment,
  onClick,
  ...rest
}) => {
  return (
    <button className={cn(styles.btn, className)} onClick={onClick} {...rest}>
      {StartAdornment && <StartAdornment />}

      <Text variant="small" className={styles.text}>
        {children}
      </Text>
    </button>
  );
};
