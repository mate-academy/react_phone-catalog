import { TechSpecsExtended } from '../../model';
import styles from '../../styles/articleSection/articleSection.module.scss';
import { Article, TechSpecs } from './ui';

type Props = {
  description: { title: string; text: string[] }[];
  specs: TechSpecsExtended;
};

export const ArticleSection = ({ description, specs }: Props) => {
  return (
    <article className={styles.articleSection} aria-label="Product description">
      <Article description={description} />
      <TechSpecs specs={specs} />
    </article>
  );
};
