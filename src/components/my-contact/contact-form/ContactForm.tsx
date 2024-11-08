import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Input, Title } from '@ui/index';

import { INPUTS_FORM } from '@utils/constants/inputs';

import styles from './ContactForm.module.scss';

export const ContactForm: FC = () => {
  const { t } = useTranslation();

  const localTitle = t('form.title');
  const localText = t('form.text');
  const localSend = t('form.send');
  const localMessage = t('form.message');
  const localPlaceholder = t('form.placeholder.write');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Send data');
  };

  return (
    <div className={styles.contactForm}>
      <Title level={2}>{localTitle}</Title>

      <p>{localText}</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        {INPUTS_FORM.map(input => (
          <Input key={input.id} input={input} />
        ))}

        <label htmlFor="message">{localMessage}</label>
        <textarea
          id="message"
          name="message"
          placeholder={localPlaceholder}
          rows={2}
          required
        ></textarea>
        <button type="submit">{localSend}</button>
      </form>
    </div>
  );
};
