import { DefaultPropsChildren } from '@shared/types/common';

export interface ListItemProps extends DefaultPropsChildren {}

export const ListItem: React.FC<ListItemProps> = ({ children, ...rest }) => (
  <li {...rest}>{children}</li>
);
