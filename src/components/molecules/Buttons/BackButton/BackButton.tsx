import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { ArrowTextButton } from '@/components/molecules';

import { useNavigationStore } from '@/shared/model/navigation.store';

import styles from './BackButton.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
  fallback?: string;
};

export const BackButton = ({ children, className, fallback = '/' }: Props) => {
  const navigate = useNavigate();

  const goBack = useNavigationStore((state) => state.goBack);

  const handleBack = () => {
    const previousPath = goBack();

    if (previousPath) {
      navigate(previousPath, { replace: true });
      return;
    }

    navigate(fallback, { replace: true });
  };

  return (
    <ArrowTextButton
      className={classNames(styles.backButton, className)}
      onClick={handleBack}
    >
      {children}
    </ArrowTextButton>
  );
};
