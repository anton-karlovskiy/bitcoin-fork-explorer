/* eslint-disable */
import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class LazyLoadingErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '64px 0',
            textAlign: 'center'
          }}>
          <button onClick={() => window.location.reload()}>Click to Reload</button>
          <p
            style={{
              textAlign: 'center',
              padding: '12px 0'
            }}>
            Lazy-loading failed!
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default LazyLoadingErrorBoundary;
