type Props = {
  className?: string;
  errorMessage: string;
};

export const ErrorMessage: React.FC<Props> = ({
  className = '',
  errorMessage,
}) => {
  const handleReload = () => {
    const currentUrl = window.location.href;

    // Використовуємо history.replaceState для оновлення URL без перезавантаження
    window.history.replaceState({}, '', currentUrl);
    // Перезавантажуємо сторінку
    window.location.reload();
  };

  return (
    <div className={`error-message ${className}`.trim()}>
      <span className="error-message__notification">{errorMessage}</span>
      <button className="error-message__reload-btn" onClick={handleReload}>
        Reload
      </button>
    </div>
  );
};
