import React, { useContext } from 'react';
import './BackButton.scss';
import { icons } from '../../../../../global-assets/static';
import { useLocation, useNavigate } from 'react-router-dom';
import { TranslationContext } from '../../../../../i18next/shared/TranslationContext';

type BackButtonProps = {
  path?: string;
  productId?: string;
};

export const BackButton: React.FC<BackButtonProps> = ({ path, productId }) => {
  const IconBack = icons.arrowLeft.valuePath;
  const navigate = useNavigate();
  const location = useLocation();
  const { btnsTitle } = useContext(TranslationContext);

  const handleBack = () => {
    if (path) {
      navigate(
        {
          pathname: path,
          search: location.state?.search,
        },
        { state: { productId: productId } },
      );

      return;
    }

    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);

      return;
    }

    navigate('/home');
  };

  return (
    <button onClick={handleBack} className="back-button">
      <IconBack className="back-button__icon" />
      <h5 className="back-button__text">{btnsTitle.back}</h5>
    </button>
  );
};
