import { Link } from 'react-router-dom';
import home from '../../assets/svg/home.svg';
import './NotFoundPage.scss';

type NotFoundPageProps = {
  title: string;
};

const NotFoundPage = ({ title }: NotFoundPageProps) => (
  <section className="not-found">
    <h1 className="not-found__title">{title}</h1>
    <Link className="not-found__link" to="/home">
      <img className="not-found__image" src={home} alt="Go to home page" />
      Go back to home page
    </Link>
  </section>
);

export default NotFoundPage;
