import { cn } from '@/shared/utils';

import styles from './Property.module.scss';

interface Props {
  title: string;
  text: string;
  titleClassName?: string;
  textClassName?: string;
  className?: string;
}

export const Property = ({
  title,
  text,
  titleClassName,
  textClassName,
  className,
}: Props) => {
  return (
    <div className={cn(styles.info__item, className)}>
      <span className={cn(styles.item__title, titleClassName)}>{title}</span>
      <span className={cn(styles.item__text, textClassName)}>{text}</span>
    </div>
  );
};
