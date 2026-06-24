import s from './ReloadButton.module.scss';

type Props = {
  title: string;
  buttonName: string;
  onChange: () => void;
};

export const ReloadButton: React.FC<Props> = ({ title, buttonName, onChange }) => (
  <div className={s.reload}>
    <p>{title}</p>
    <button className={s.reloadButton} type="button" onClick={onChange}>
      {buttonName}
    </button>
  </div>
);
