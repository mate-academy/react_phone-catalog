/* eslint-disable react/display-name */
import classNames from 'classnames';
import { memo, ReactNode } from 'react';
import cls from './sectionTop.module.scss';
import { TitleTag } from '../../TitleTag';

interface Props {
  className?: string;
  classNameTitle?: string;
  title: string;
  children?: ReactNode;
}

export const SectionTop = memo(
  ({ className, title, classNameTitle, children }: Props) => {
    return (
      <div className={classNames(className, cls.sectionTop)}>
        <TitleTag title={title} Tag="h2" className={classNameTitle} />
        {children}
      </div>
    );
  },
);
