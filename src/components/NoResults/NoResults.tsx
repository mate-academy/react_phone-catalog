import { ErrorText } from '../../types/ErrorText';
import './NoResults.scss';

type Props = {
  text: string | ErrorText,
};

export const NoResults = ({ text }: Props) => {
  return (
    <p className="no-results">{text}</p>
  );
};
