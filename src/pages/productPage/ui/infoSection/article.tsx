import classNames from 'classnames';
import { getSkeletonArray } from '../../model';
import styles from '../../styles/infoSection/article.module.scss';
import { SkeletonLines } from './skeletonLines';

type Props = {
  description: { title: string; text: string[] }[] | null;
};

export const Article = ({ description }: Props) => {
  const isSkeleton = description === null;
  const array = isSkeleton ? getSkeletonArray() : description;

  return array.map(el => (
    <div key={el.title} className={styles['inner-container']}>
      <h3
        className={isSkeleton ? styles['skeleton-headline'] : styles.headline}
      >
        {el.title.length > 2 && el.title}
      </h3>

      {el.text.map((text, index) => (
        <p
          key={index}
          className={classNames(styles['main-text'], {
            [styles['skeleton-paragraph']]: isSkeleton,
          })}
        >
          {isSkeleton ? <SkeletonLines /> : text}
        </p>
      ))}
    </div>
  ));
};
