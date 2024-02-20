import { ReactNode } from 'react';
import './Container.scss';

type Props = {
  children: ReactNode;
};

export const Container: React.FC<Props> = ({ children }) => {
  return <div className="container">{children}</div>;
};
