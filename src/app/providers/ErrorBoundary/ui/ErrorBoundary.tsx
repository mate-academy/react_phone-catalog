/* eslint-disable @typescript-eslint/indent */
import React, { ErrorInfo, ReactNode } from 'react';
import { PageError } from '../../../../widgets/PageError';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: {
    error: Error;
    errorInfo: ErrorInfo;
  } | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  // Початковий стан компонента
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  // Метод для оновлення стану при виникненні помилки
  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  // Ловить помилку і оновлює стан
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    // console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error: { error, errorInfo },
    });
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <PageError error={error} />;
    }

    return children;
  }
}
