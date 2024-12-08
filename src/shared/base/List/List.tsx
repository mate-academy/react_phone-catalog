import cn from 'classnames';

import { DefaultPropsChildren } from '@shared/types/common';

import styles from './List.module.scss';

export interface ListProps extends DefaultPropsChildren {}

export const List: React.FC<ListProps> = ({ children, className, ...rest }) => (
  <ul className={cn(styles.list, className)} {...rest}>
    {children}
  </ul>
);
