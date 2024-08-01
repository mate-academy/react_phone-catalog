import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import cls from './page.module.scss';

interface Props {
  className?: string;
  children: ReactNode;
}

export const Page: FC<Props> = ({ children, className }) => {
  return <main className={classNames(cls.page, className)}>{children}</main>;
};
