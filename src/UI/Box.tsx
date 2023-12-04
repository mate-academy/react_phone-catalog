import { FC, ReactNode } from 'react';
import styled from './Box.module.scss';

type Props = {
  children: ReactNode;
};

export const Box: FC<Props> = ({ children }) => {
  return (
    <div className={styled.content}>{children}</div>
  );
};
