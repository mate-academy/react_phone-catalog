import style from './Title.module.scss';

type Props = { text: string; level?: number; levelSize?: number | string };

export const Title: React.FC<Props> = ({
  text,
  level = 1,
  levelSize = level,
}) => {
  if (level === 2) {
    return (
      <h2 className={`${style.title} ${style[`title--${levelSize}`]}`}>
        {text}
      </h2>
    );
  } else if (level === 3) {
    return (
      <h3 className={`${style.title} ${style[`title--${levelSize}`]}`}>
        {text}
      </h3>
    );
  } else if (level === 4) {
    return (
      <h4 className={`${style.title} ${style[`title--${levelSize}`]}`}>
        {text}
      </h4>
    );
  } else {
    return (
      <h1 className={`${style.title} ${style[`title--${levelSize}`]}`}>
        {text}
      </h1>
    );
  }
};
