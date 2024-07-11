import { ReactNode } from 'react';
import style from './Skeleton.module.scss';

type Props = {
  children: ReactNode;
};

export const Skeleton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div className={style.sceleton}>
      <div {...props}>{children}</div>
    </div>
  );
};
