import { memo } from 'react';
import cls from './textBlock.module.scss';
import classNames from 'classnames';

interface Props {
  className?: string;
  text: string;
}

export const TextBlock = memo(({ text, className }: Props) => {
  return <p className={classNames(cls.text, className)}>{text}</p>;
});
