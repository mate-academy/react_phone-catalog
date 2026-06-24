import styles from './Input.module.scss';

type Props = {
  type: 'text' | 'email' | 'number' | 'password';
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}: Props) => {
  return (
    <div>
      {error && <span className={styles.error}>{error}</span>}
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};
