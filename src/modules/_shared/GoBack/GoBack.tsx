import { useTranslation } from 'react-i18next';
import { BackStyled } from './styled';
import { useNavigate } from 'react-router-dom';
import { VECTOR_SVG } from '../../../utils/SVG';
import { StrCode } from '../../../utils/enums';

const GoBack = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    if (
      document.referrer &&
      document.referrer.includes(window.location.hostname)
    ) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <BackStyled onClick={handleBack}>
      <VECTOR_SVG variant="left" />

      {t(StrCode.Back)}
    </BackStyled>
  );
};

export default GoBack;
