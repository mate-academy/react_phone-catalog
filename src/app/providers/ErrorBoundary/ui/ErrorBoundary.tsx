/* eslint-disable react/state-in-constructor */
/* eslint-disable @typescript-eslint/indent */
import React, { ReactNode } from 'react';
import { PageError } from '../../../../widgets/PageError';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  //   console.log(error, errorInfo);
  // }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <PageError />;
    }

    return children;
  }
}
