import { useCallback } from 'react';
import { Icon } from '../Icon';
import { IconEnum } from '../../../../types/iconsType';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import backButton from './backButton.module.scss';
import { PagesType } from '../../../../types/PagesType';

export const BackButton = () => {
  const { pathname } = useLocation();
  const { productId } = useParams();
  const navigate = useNavigate();
  const handleGoBack = useCallback(() => {
    navigate(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!productId && pathname !== PagesType.cart) {
    return null;
  }

  return (
    <div
      onClick={handleGoBack}
      className={cn(backButton['back-button'], 'container')}
    >
      <div className={cn(backButton['back-button__icon'])}>
        <Icon iconName={IconEnum.arrow} />
      </div>
      <p className={cn(backButton['back-button__text'])}>Back</p>
    </div>
  );
};
