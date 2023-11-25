import BackButton from '../../components/BackButton/BackButton';
import './NotFoundPage.scss';

type Props = {
  title: string;
};

const NotFoundPage:React.FC<Props> = ({ title }) => {
  return (
    <div className="notFoundPage main__section">
      <BackButton />
      <div className="notFoundPage__body">
        <div className="notFoundPage__message">
          {title}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
