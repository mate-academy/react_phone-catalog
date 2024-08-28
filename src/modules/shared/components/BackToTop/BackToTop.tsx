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
    <label className={classNames(styles.BackToTop, className)}>
      {backToTop}
      <IconButton
        svgOption={IconButtonSVGOption.UpArrow}
        onClick={handleClick}
      />
    </label>
  );
};
