import { ErrorMessage } from '../../types/ErrorMessage';
import { Error } from '../shared/Error';

export const NotFoundPage = () => {
  return <Error errorMessage={ErrorMessage.PageNotFound} />;
};
