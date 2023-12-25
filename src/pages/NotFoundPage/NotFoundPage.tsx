import { PageLink } from '../../components/PageLink';
import { PageLinkType } from '../../types/PageLinkType';

import './NotFoundPage.scss';

export const NotFoundPage = () => (
  <section className="Page-Section NotFoundPage">
    <h1 className="NotFoundPage-Title SectionTitle">Page not found</h1>

    <PageLink
      to="/"
      linkType={PageLinkType.TEXT}
    >
      home
    </PageLink>
  </section>
);
