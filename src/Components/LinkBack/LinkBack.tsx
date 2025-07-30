import { Link } from 'react-router-dom';
import './LinkBack.scss';
import { useTranslationState } from '../../stateManagers/languageState';

export const LinkBack = () => {
  const { translate } = useTranslationState();

  return (
    <div className="url-back">
      <div className="url-back__icon-arrow"></div>
      <Link
        to="../"
        className="small-text title-grey"
      >
        {translate('Back')}
      </Link>
    </div>
  );
};
