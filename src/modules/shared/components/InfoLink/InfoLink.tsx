import styles from './InfoLink.module.scss';

type Props = {
  title: string;
  to: string;
};

export const InfoLink: React.FC<Props> = ({ title, to }) => {
  return (
    <li>
      <a href={to} className={styles.Link}>
        {title}
      </a>
    </li>
  );
};
