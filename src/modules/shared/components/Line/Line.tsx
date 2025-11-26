import scss from './Line.module.scss';

interface Props {
  marginTop: number;
  marginBottom: number;
}

export const Line: React.FC<Props> = ({ marginTop, marginBottom }) => {
  return (
    <hr
      className={scss.line}
      style={{ margin: `${marginTop}rem 0 ${marginBottom}rem` }}
    ></hr>
  );
};
