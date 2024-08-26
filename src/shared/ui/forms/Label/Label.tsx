import { FC, LabelHTMLAttributes } from 'react';
import cls from './label.module.scss';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
}

export const Label: FC<Props> = ({ htmlFor, label }) => {
  return (
    <label className={cls.label} htmlFor={htmlFor}>
      {label}
    </label>
  );
};
