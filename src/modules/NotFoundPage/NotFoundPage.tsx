import { Link } from 'react-router-dom';
import { Container } from '../../components/Container';
import { StatusMessage } from '../shared';

export const NotFoundPage = () => (
  <Container>
    <StatusMessage text="Page not found" image="img/page-not-found.png">
      <Link to="/">Go to Home page</Link>
    </StatusMessage>
  </Container>
);
