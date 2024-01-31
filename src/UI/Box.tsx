import { FC, ReactNode } from 'react';
import cn from 'classnames';
import './Box.scss';

type Props = {
  children: ReactNode;
  classname?: string;
};

export const Box: FC<Props> = ({ children, classname }) => {
  return (
    <div className={cn('content', classname)}>{children}</div>
  );
};

Box.defaultProps = {
  classname: '',
};
