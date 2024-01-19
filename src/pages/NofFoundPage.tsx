import { Link } from 'react-router-dom';
import { Title } from '../components/main/Title';
import { HOME_LINK } from '../helpers/constants/Links';

export const NotFoundPage = () => (
  <main className="not-found">
    <Title>Page not found</Title>

    <Link to={HOME_LINK}>Go to home</Link>
  </main>
);
