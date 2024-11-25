import classNames from 'classnames';
import { IconButtonSVGOption } from '../../types/enums';
import { IconButton } from '../IconButton';
import styles from './BackToTop.module.scss';
import { useLanguage } from '../Contexts/LanguageContext';

type Props = {
  className?: string;
};

export const BackToTop: React.FC<Props> = ({ className }) => {
  const { backToTop } = useLanguage().localeTexts;

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <IconButton
      svgOption={IconButtonSVGOption.UpArrow}
      label={backToTop}
      className={classNames(styles.BackToTop, className)}
      labelClassName={styles.Label}
      onClick={handleClick}
    />
  );
};
