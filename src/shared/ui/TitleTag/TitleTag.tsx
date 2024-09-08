/* eslint-disable react/display-name */
import { memo } from 'react';
import cls from './titleTag.module.scss';
import classNames from 'classnames';

export type TitleTagType = 'h1' | 'h2' | 'h3' | 'h4';

interface Props {
  className?: string;
  Tag: TitleTagType;
  title: string;
}

export const TitleTag = memo(({ className, Tag, title }: Props) => {
  return (
    <Tag className={classNames(cls.title, className, [cls[Tag]])}>{title}</Tag>
  );
});
