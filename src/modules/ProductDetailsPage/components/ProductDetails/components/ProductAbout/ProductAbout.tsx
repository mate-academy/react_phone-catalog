import { Divider } from '@/shared/components/Divider';
import styles from './ProductAbout.module.scss';
import classNames from 'classnames';

interface Props {
  description: { title: string; text: string[] }[];
  className?: string;
}

export const ProductAbout = ({ description, className }: Props) => {
  return (
    <div className={classNames(styles.productAbout, className)}>
      <div className={styles.header}>
        <h2 className={styles.title}>About</h2>
        <Divider />
      </div>

      {description.map(textBlock => (
        <div key={textBlock.title} className={styles.textBlock}>
          <h3 className={styles.textBlockTitle}>{textBlock.title}</h3>

          <div className={styles.textBlockContent}>
            {textBlock.text.map(text => (
              <p key={text} className={styles.textBlockText}>
                {text}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
