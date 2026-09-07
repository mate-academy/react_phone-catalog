export const ErrorState: React.FC<{
  message?: string;
  onRetry?: () => void;
}> = ({ message = 'Something went wrong', onRetry }) => (
  <div style={{ padding: 24 }}>
    <p>{message}</p>
    {onRetry && (
      <button onClick={onRetry} style={{ marginTop: 8 }}>
        Reload
      </button>
    )}
  </div>
);
