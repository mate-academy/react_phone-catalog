import { FC, ReactNode } from 'react';
import cls from './container.module.scss';

interface Props {
  children: ReactNode;
}

export const Container: FC<Props> = ({ children }) => {
  return <div className={cls.container}>{children}</div>;
};
