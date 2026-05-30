import { FC } from 'react';
import s from './ProductTechSpec.module.scss';

interface Props {
  techSpec: { label: string; value: string }[];
}
export const ProductTechSpec: FC<Props> = ({ techSpec }) => {
  return (
    <div className={s.techSpec}>
      {techSpec.map(spec => (
        <div className={s.techItem} key={spec.label}>
          <span className={s.techLabel}>{spec.label}</span>
          <span className={s.techValue}>{spec.value}</span>
        </div>
      ))}
    </div>
  );
};
