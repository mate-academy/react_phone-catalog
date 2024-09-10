/* eslint-disable react/state-in-constructor */
/* eslint-disable @typescript-eslint/indent */
import React, { ErrorInfo, ReactNode } from 'react';
import { PageError } from '../../../../widgets/PageError';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?:
    | {
        error: Error;
        errorInfo: ErrorInfo;
      }
    | undefined;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // console.log(error, errorInfo);
    this.setState({
      hasError: true,
      error: {
        error,
        errorInfo,
      },
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
