import { Container } from '../../modules/Container';
import errorImg from './../../images/placeholders/page-not-found.png';

export const Error = () => {
  return (
    <section className="error" style={{ padding: '10px 0' }}>
      <Container>
        <h1 style={{ marginBottom: '15px' }}>Ooops something went wrong</h1>
        <div style={{ textAlign: 'center' }} className="error__img">
          <img style={{ width: '80%' }} src={errorImg} alt="Error image" />
        </div>
      </Container>
    </section>
  );
};
