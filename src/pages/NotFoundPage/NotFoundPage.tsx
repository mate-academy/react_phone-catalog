import { CenteredContent } from '../../components/CenteredContent';
import { NotFound } from '../../components/NotFound';
import { IMG_NOT_FOUND, TITLE_NOT_FOUND } from '../../constants/notFound';

export const NotFoundPage = () => {
  return (
    <CenteredContent>
      <NotFound img={IMG_NOT_FOUND.product} text={TITLE_NOT_FOUND.query} />
    </CenteredContent>
  );
};
