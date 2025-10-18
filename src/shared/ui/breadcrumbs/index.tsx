import { ArrowIcon, HomeIcon } from '@shared/icons';
import { Link } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';
import { AriaNames } from '@shared/types/ButtonProps';

type Props = {
  links?: {
    name: string;
    to: string;
  }[];
};

export const Breadcrumbs = ({ links }: Props) => {
  return (
    <ul className={styles.breadcrumbs}>
      <li>
        <Link to="/" aria-label={AriaNames.Home}>
          <HomeIcon />
        </Link>
      </li>
      {links &&
        links.map(el => (
          <li key={el.name}>
            <ArrowIcon direction="right" />
            <Link to={`/${el.to}`}>{el.name}</Link>
          </li>
        ))}
    </ul>
  );
};
