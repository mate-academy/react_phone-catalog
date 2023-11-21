import { BackButton } from '../../components/BackButton';
import { NotFound } from '../../components/NotFound';
import { ErrorType } from '../../types/Error';

export const NotFoundPage = () => (
  <>
    <BackButton />

    <NotFound error={ErrorType.PAGE_NOT_FOUND} />
  </>
);
