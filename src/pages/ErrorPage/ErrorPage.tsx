import { Container } from '../../components/Container/Container';
import { Error } from '../../components/Error/Error';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';

export const ErrorPage = () => {
  return (
    <>
      <Header />
      <main className="root">
        <Container>
          <Error />
        </Container>
      </main>
      <Footer />
    </>
  );
};
