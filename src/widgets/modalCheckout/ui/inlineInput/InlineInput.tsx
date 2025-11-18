import styles from './inlineInput.module.scss';

type Props = {
  title: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InlineInput = ({ title, id, onChange }: Props) => {
  return (
    <div className={styles['input-wrapper']}>
      <label htmlFor="firstName">{title}</label>
      <input type="text" id={id} name={id} required onChange={onChange} />
    </div>
  );
};
