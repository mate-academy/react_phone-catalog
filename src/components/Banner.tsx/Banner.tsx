import styles from './Banner.module.css';

export type BannerProps = {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

const Banner: React.FC<BannerProps> = ({
  children = null,
  className = '',
  'data-testid': dataTestId = 'banner',
}) => {
  return (
    <div
      className={`${styles.container} ${className}`.trim()}
      data-testid={dataTestId}
      role="region"
      aria-label="Banner"
    >
      {children}
    </div>
  );
};

export default Banner;
