import styles from './LogoLink.module.scss';

type Props = {
  className?: string;
};

export const LogoLink: React.FC<Props> = ({ className }) => {
  return (
    <a className={className} href="#">
      <img
        className={styles.Image}
        src="./img/logo.svg"
        alt="Nice Gadgets"
      ></img>
    </a>
  );
};
