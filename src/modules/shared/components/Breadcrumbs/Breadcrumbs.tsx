import { Link } from 'react-router-dom';
import { homePath } from '../../consts/paths';
import { HomeSVG } from '../SVGs/HomeSVG';
import { RightArrowSVG } from '../SVGs/RightArrowSVG';
import styles from './Breadcrumbs.module.scss';
import classNames from 'classnames';
import { useLanguage } from '../Contexts/LanguageContext';

type Props = {
  path: string[];
  links?: string[];
  className?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ path, links, className }) => {
  const { accessHome, accessThen } = useLanguage().localeTexts;

  const content: React.JSX.Element[] = [];

  for (let i = 0; i < path.length; i++) {
    content.push(
      <RightArrowSVG
        key={'arrow_' + i}
        className={styles.Arrow}
        label={accessThen}
      />,
    );

    if (links && links[i]) {
      content.push(
        <Link key={'link_' + path[i]} to={links[i]} className={styles.Link}>
          {path[i]}
        </Link>,
      );
    } else {
      content.push(
        <p key={'text_' + path[i]} className={styles.Text}>
          {path[i]}
        </p>,
      );
    }
  }

  return (
    <article className={classNames(styles.Breadcrumbs, className)}>
      <Link to={homePath} aria-label={accessHome}>
        <HomeSVG className={styles.HomeImage} />
      </Link>

      {content}
    </article>
  );
};
