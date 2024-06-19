import styles from './BannerButton.module.scss';

type Props = {
  isDisabled: boolean;
  onClick: () => void;
  icon: string;
  type: string;
};

export const BannerButton: React.FC<Props> = ({
  isDisabled,
  onClick,
  icon,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${styles.BannerButton} ${styles[type]}`}
    >
      <img src={icon} alt="icon" />
    </button>
  );
};
