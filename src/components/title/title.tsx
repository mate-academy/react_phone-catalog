import classNames from 'classnames';
import styles from './title.module.scss';

type Props = {
  title: {
    title: string;
  };
  marginBottom?: true;
};

export const Title: React.FC<Props> = ({ title, marginBottom = false }) => {
  return (
    <h1
      className={classNames(styles.title, marginBottom && styles.marginBottom)}
    >
      {title.title}
    </h1>
  );
};
