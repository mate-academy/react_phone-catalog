import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { notFoundPageErrorMessage } from '../../helpers/consts';

export const NotFoundPage: React.FC = () => {
  return (
    <ErrorMessage message={notFoundPageErrorMessage} />
  );
};
