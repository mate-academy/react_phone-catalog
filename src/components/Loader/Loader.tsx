import { Oval } from 'react-loader-spinner';
import classNames from 'classnames';
import styles from './Loader.module.scss';

type Props = {
  className?: string;
  size?: number;
  ariaLabel?: string;
};

export const Loader = ({
  className,
  size = 80,
  ariaLabel = 'Loading',
}: Props) => {
  return (
    <div className={classNames(styles.loader, className)}>
      <Oval
        height={size}
        width={size}
        color="#000"
        secondaryColor="rgba(0, 0, 0, 0.2)"
        strokeWidth={4}
        strokeWidthSecondary={4}
        ariaLabel={ariaLabel}
        visible
      />
    </div>
  );
};
