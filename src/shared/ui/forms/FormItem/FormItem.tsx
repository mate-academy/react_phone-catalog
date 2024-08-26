import { memo, ReactNode } from 'react';
import cls from './formItem.module.scss';
import classNames from 'classnames';
import { Label } from '../Label/Label';

interface Props {
  className?: string;
  label?: string;
  children: ReactNode;
  formElementId?: string;
}

export const FormItem = memo((props: Props) => {
  const { children, className, label, formElementId } = props;

  return (
    <div className={classNames(cls.item, className)}>
      {label && (
        // eslint-disable-next-line jsx-a11y/label-has-for
        <Label label={label} htmlFor={formElementId} />
      )}
      {children}
    </div>
  );
});
