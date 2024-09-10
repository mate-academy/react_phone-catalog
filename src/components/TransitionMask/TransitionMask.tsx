import styles from './TransitionMask.module.scss';

type TransitionMaskProps = {
  children: any;
  isUpdating: boolean;
};

export const TransitionMask = ({
  children,
  isUpdating,
}: TransitionMaskProps) => {
  return (
    <div
      className={`${styles.transition} ${isUpdating && styles.transition__isUpdating}`}
    >
      {children}
    </div>
  );
};
