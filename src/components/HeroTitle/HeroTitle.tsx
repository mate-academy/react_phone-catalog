import styles from './HeroTitle.module.scss';
import classNames from 'classnames';

interface HeroTitleProps {
  title: string;
}

export const HeroTitle: React.FC<HeroTitleProps> = ({ title }) => {
  const titleLines = title.split('\n');

  return (
    <div className={styles.wrapper}>
      <div className={classNames('container', styles.content)}>
        <h1 className={styles.title}>
          {titleLines.map((line, index) => (
            <span key={index} className={styles.line}>
              {line}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};
