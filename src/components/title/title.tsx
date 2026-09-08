import classNames from 'classnames';
import styles from './title.module.scss';
import { titles } from '../../constants/titles';

type Props = {
  title: string;
  marginBottom?: true;
  cart?: boolean;
};

export const Title: React.FC<Props> = ({
  title,
  marginBottom = false,
  cart = false,
}) => {
  return (
    <h1
      className={classNames(
        styles.title,
        marginBottom && styles.marginBottom,
        cart && styles.marginTop,
      )}
    >
      {titles[title as keyof typeof titles]}
    </h1>
  );
};
