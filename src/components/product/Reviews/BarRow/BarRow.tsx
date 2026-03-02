import './BarRow.scss';

type Props = {
  label: string;
  pct: number;
  animate: boolean;
};

export const BarRow = ({ label, pct, animate }: Props) => {
  return (
    <div className="bar-row">
      <span className="bar-row__label">{label}</span>

      <div className="bar-row__track">
        <div
          className="bar-row__fill"
          style={{ width: animate ? `${pct}%` : 0 }}
        />
      </div>

      <span className="bar-row__pct">{pct}%</span>
    </div>
  );
};
