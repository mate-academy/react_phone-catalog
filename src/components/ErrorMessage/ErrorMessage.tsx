import './ErrorMessage.scss';

type Props = {
  message: string;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  return <div className="error-message">{message}</div>
}
