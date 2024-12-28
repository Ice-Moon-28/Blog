import React, { useState, useEffect } from 'react';

export function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);

  const handleError = (error, info) => {
    setHasError(true);
    setErrorInfo({ error, info });
  };

  useEffect(() => {
    if (hasError) {
      console.error('Error caught in ErrorBoundary:', errorInfo?.error);
      console.error('Error info:', errorInfo?.info);
    }
  }, [hasError, errorInfo]);

  if (hasError) {
    return (
      <div>
        <h1>Something went wrong.</h1>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {errorInfo?.error.toString()}
          <br />
          {errorInfo?.info.componentStack}
        </details>
      </div>
    );
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {children}
    </React.Suspense>
  );
}

export default ErrorBoundary;