import { FC } from 'react';
import './../../../../styles/global.scss';

type Props = {
  children: React.ReactNode;
  fullWidth?: boolean;
};

export const PageContainer: FC<Props> = ({ children, fullWidth }) => {
  return (
    <div className="page">
      <div className={fullWidth ? 'container-full' : 'container'}>
        {children}
      </div>
    </div>
  );
};
