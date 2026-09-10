import styles from './Skeleton.module.scss';

interface Props {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export const Skeleton = ({ width, height, borderRadius }: Props) => {
  return (
    <div
      className={styles.skeleton}
      style={{ width: width, height: height, borderRadius: borderRadius }}
    />
  );
};
