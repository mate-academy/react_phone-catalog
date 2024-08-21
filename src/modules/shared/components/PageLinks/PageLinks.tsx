import classNames from 'classnames';
import {
  accessoriesPath,
  homePath,
  phonesPath,
  tabletsPath,
} from '../../consts/paths';
import { useLanguage } from '../Contexts/LanguageContext';
import { PageLink } from '../PageLink';
import styles from './PageLinks.module.scss';

type Props = {
  className?: string;
};

export const PageLinks: React.FC<Props> = ({ className }) => {
  const { home, phones, tablets, accessories } = useLanguage().localeTexts;

  return (
    <menu className={classNames(styles.PageLinks, className)}>
      <PageLink title={home} to={homePath} />
      <PageLink title={phones} to={phonesPath} />
      <PageLink title={tablets} to={tabletsPath} />
      <PageLink title={accessories} to={accessoriesPath} />
    </menu>
  );
};
