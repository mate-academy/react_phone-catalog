import { Container } from '../../components/Container/Container';
import { Error } from '../../components/Error/Error';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import './ErrorPage.scss';

export const ErrorPage = () => {
  return (
    <>
      <Header />
      <main className="root">
        <Container>
          <div className="error-page">
            <Error />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};
