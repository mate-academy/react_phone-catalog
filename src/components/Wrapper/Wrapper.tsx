import { ReactNode } from 'react';
import './Wrapper.scss';

type Props = {
  children: ReactNode,
};

export const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="wrapper">{children}</div>
  );
};
