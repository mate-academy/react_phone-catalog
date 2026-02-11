import './ErrorBlock.scss';

type Props = {
  message: string;
  onReload?: () => void;
};

export const ErrorBlock: React.FC<Props> = ({ message, onReload }) => {
  return (
    <div className="error">
      <div className="error__content">
        <span className="error__title">Error</span>
        <div className="error__bottom">
          <span className="error__message">{message}</span>

          {onReload && (
            <div className="error__button" onClick={onReload}>
              Reload
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
