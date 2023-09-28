import { Header } from '../../components/Header/Header';
import './NotFoundPage.scss';

export const NotFoundPage = () => (
  <>
    <Header />
    <section className="not-found-page">
      <div className="container">
        <h3 className="not-found-page__title">
          Page not found :(
        </h3>
      </div>
    </section>
  </>

);
