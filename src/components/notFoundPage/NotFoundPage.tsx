import Styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => (
  <>
    <p className={Styles.not__paragraph}>Page not found</p>
    <img className={Styles.not__img} src=".\img\product-not-found.png" />
  </>
);
