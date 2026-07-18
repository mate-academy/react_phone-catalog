import classNames from 'classnames';
import loaderStyles from './LoaderOverlay.module.scss';
import { useLoading } from '../../context/LoadingContext';
import { createPortal } from 'react-dom';

export const LoaderOverlay = () => {
  const { isLoading } = useLoading();

  if (!isLoading) {
    return null;
  }

  return createPortal(
    <div className={classNames(loaderStyles.overlay)}>
      <div className={loaderStyles.overlay__spinner} />
    </div>,
    document.body,
  );
};
