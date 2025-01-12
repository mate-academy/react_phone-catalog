import style from './Subtitle.module.scss';

type Props = {
  text: string;
};

const Subtitle: React.FC<Props> = ({ text }) => {
  return <h2 className={style.title}>{text}</h2>;
};

export default Subtitle;
