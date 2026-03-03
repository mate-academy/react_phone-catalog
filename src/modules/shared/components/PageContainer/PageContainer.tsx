import { FC } from 'react';
import './../../../../styles/global.scss';

type Props = {
  children: React.ReactNode;
};

export const PageContainer: FC<Props> = ({ children }) => {
  return (
    <div className="page">
      <div className="container">{children}</div>
    </div>
  );
};
