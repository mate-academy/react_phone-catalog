import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { TInput } from '@utils/constants/inputs';

import styles from './Input.module.scss';

type TProps = {
  input: TInput;
};

export const Input: FC<TProps> = ({ input }) => {
  const { id, type, placeholder, minLength } = input;
  const { t } = useTranslation();

  const localPlaceholder = t(`form.placeholder.${placeholder}`);
  const localLabel = t(`form.label.${id}`);

  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {localLabel}
      </label>
      <input
        id={id}
        type={type}
        name={id}
        placeholder={localPlaceholder}
        minLength={minLength}
        className={styles.input}
        required
      />
    </>
  );
};
