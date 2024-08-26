import { CSSProperties, memo, useMemo } from 'react';
import cls from './sceleton.module.scss';
import classNames from 'classnames';

interface SceletonProps {
  className?: string;
  height: number | string;
  width: number | string;
  borderRadius?: string;
}

export const Sceleton = memo((props: SceletonProps) => {
  const { className, height, width, borderRadius } = props;

  const styles = useMemo<CSSProperties>(() => {
    return {
      height,
      width,
      borderRadius,
    };
  }, [borderRadius, height, width]);

  return <div style={styles} className={classNames(className, cls.sceleton)} />;
});
