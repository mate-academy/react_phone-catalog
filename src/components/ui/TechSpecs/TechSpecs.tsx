import cl from './TechSpecs.module.scss';

type Props = {
  // array resembling '[spec name, spec value]'
  chars: string[][];
  className?: string; // for outer positioning
};

export const TechSpecs: React.FC<Props> = ({ chars }) => {
  return (
    <dl className={cl.chars}>
      {chars.map(char => (
        <div className={cl.chars__line} key={char[0]}>
          <dt className={cl.chars__definition}>{char[0]}</dt>
          <dd className={cl.chars__value}>{char[1]}</dd>
        </div>
      ))}
    </dl>
  );
};
