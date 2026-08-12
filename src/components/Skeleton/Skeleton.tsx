import styles from './Skeleton.module.scss';

type Props = {
  className?: string;
};

export const Skeleton = ({ className = '' }: Props) => {
  const skeletonClassName = [styles.skeleton, className]
    .filter(Boolean)
    .join(' ');

  return <div className={skeletonClassName} aria-hidden="true" />;
};
