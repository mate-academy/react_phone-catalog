import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ErrorBoundary.module.scss';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

const ErrorFallback = () => {
  const { t } = useTranslation();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.errorFallback}>
      <h2 className={styles.errorFallbackTitle}>{t('errors.unknown')}</h2>
      <button className={styles.errorFallbackButton} onClick={handleReload}>
        {t('errors.reloadPage')}
      </button>
    </div>
  );
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
