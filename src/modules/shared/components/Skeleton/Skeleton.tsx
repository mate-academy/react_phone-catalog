import cn from 'classnames';
import styles from './Skeleton.module.scss';

interface Props {
  width?: string;
  height?: string;
  /** Rounds the block into a pill, for avatars and small controls. */
  isRound?: boolean;
  className?: string;
}

export const Skeleton: React.FC<Props> = ({
  width,
  height,
  isRound = false,
  className,
}) => (
  <span
    className={cn(styles.skeleton, { [styles.round]: isRound }, className)}
    style={{ width, height }}
  />
);
