import { FC, ReactChild } from 'react';
import './NotFound.scss';

type Props = {
  children: ReactChild;
};

export const NotFound: FC<Props> = ({ children }) => (
  <p className="not-found">{children}</p>
);
