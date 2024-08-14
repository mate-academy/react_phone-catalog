import { Link } from 'react-router-dom';
import { homePath } from '../../consts/paths';
import { HomeSVG } from '../SVGs/HomeSVG';
import { RightArrowSVG } from '../SVGs/RightArrowSVG';
import styles from './Breadcrumbs.module.scss';
import classNames from 'classnames';
import { useLanguage } from '../Contexts/LanguageContext';

type Props = {
  path: string;
  className?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ path, className }) => {
  const { accessHome, accessThen } = useLanguage().localeTexts;

  return (
    <article className={classNames(styles.Breadcrumbs, className)}>
      <Link to={homePath} aria-label={accessHome}>
        <HomeSVG className={styles.HomeImage} />
      </Link>

      <RightArrowSVG className={styles.Arrow} alt={accessThen} />

      <p className={styles.Current}>{path}</p>
    </article>
  );
};
