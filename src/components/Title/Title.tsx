import style from './Title.module.scss';

type Props = {
  text: string;
};

const Title: React.FC<Props> = ({ text }) => {
  return (
    <div className="container">
      <h1 className={style.title}>{text}</h1>
    </div>
  );
};

export default Title;
