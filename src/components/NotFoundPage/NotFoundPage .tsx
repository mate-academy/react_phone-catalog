import pageNotFoundStyles from './NotFoundPage.module.scss';
import HeaderLogoMenu from '../HeaderLogoMenu/HeaderLogoMenu';
import Footer from '../Footer';

const NotFoundPage = () => (
  <>
    <HeaderLogoMenu />

    <div className={pageNotFoundStyles.page}>
      <h1 className={pageNotFoundStyles.page__title}>Page not found</h1>

      <img
        src="public/img/page-not-found.png"
        alt="Page not found"
        className={pageNotFoundStyles.page__image}
      />
    </div>

    <Footer />
  </>
);

export default NotFoundPage;
