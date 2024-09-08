import { memo, ReactNode } from 'react';
import cls from './formLine.module.scss';
import classNames from 'classnames';

interface Props {
  className?: string;
  wrap?: boolean;
  children: ReactNode;
}

export const FormLine = memo(({ children, wrap, className }: Props) => {
  return (
    <div
      className={classNames(cls.formLine, [className], { [cls.wrap]: wrap })}
    >
      {children}
    </div>
  );
});
