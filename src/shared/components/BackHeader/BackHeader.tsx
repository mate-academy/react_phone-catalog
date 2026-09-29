import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus';
import { useProducts } from '@/shared/context/ProductsContext';
import { useProductDetails } from '@/modules/ProductDetailsPage/hooks';

import { ArrowIcon } from '@/shared/assets/icons';

import './BackHeader.scss';

type Props = {
  catalogTitle?: string;
  className?: string;
};

export const BackHeader: React.FC<Props> = ({
  catalogTitle,
  className = '',
}) => {
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const { hasError } = useProducts();
  const { hasErrorDetails } = useProductDetails();

  const hasAnyError = hasError || hasErrorDetails;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={`back-header ${className}`.trim()}>
      {!hasAnyError && isOnline && (
        <button className="back-header__btn" type="button" onClick={handleBack}>
          <ArrowIcon className="back-header__btn-arrow" />
          <span className="back-header__btn-item">Back</span>
        </button>
      )}

      <h1 className="back-header__title">{catalogTitle}</h1>
    </div>
  );
};
