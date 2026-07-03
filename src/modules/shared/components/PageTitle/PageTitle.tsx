import { FC } from 'react';
import baseStyles from './base.module.scss';

type Props = {
  title: string;
  count?: string;
};

export const PageTitle: FC<Props> = ({ title, count }) => {
  return (
    <div className={baseStyles.pageTitle}>
      <h1>{title}</h1>

      {count && <div aria-live="polite">{count}</div>}
    </div>
  );
};
