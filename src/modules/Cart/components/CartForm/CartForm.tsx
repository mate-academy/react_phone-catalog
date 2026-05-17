import React from 'react';
import styles from './CartForm.module.scss';
import { TextInput } from '../../../../shared/UI/Inputs/TextInput';
import { CheckBox } from '../../../../shared/UI/Inputs/CheckBox';
import { PrimaryButton } from '../../../../shared/UI/Buttons/PrimaryButton';
import { useCartForm } from '../../hooks/useCartForm';
import { useTranslation } from 'react-i18next';

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  message?: string;
}

export const CartForm: React.FC<Props> = ({ onCancel, onSubmit, message }) => {
  const {
    name,
    surname,
    email,
    addres,
    consent,
    setConsent,
    formValid,
    formSubmit,
  } = useCartForm(onSubmit);
  const { t } = useTranslation();

  return (
    <>
      <h2 className={styles.title}>{t('cart_page.form.title')}</h2>

      <hr className={styles.line} />

      <form className={styles.form} onSubmit={formSubmit}>
        <label className={styles.form__item}>
          {t('cart_page.form.name')}
          <TextInput
            type="text"
            placeholder="Maksim"
            value={name.value}
            onChange={name.onChange}
            onBlur={name.onBlur}
            name="name"
            valid={name.isDirty && !name.inputValid}
          />
          {name.isDirty && name.inputError && (
            <p className={styles.error__message}>{name.inputError}</p>
          )}
        </label>

        <label className={styles.form__item}>
          {t('cart_page.form.surname')}
          <TextInput
            type="text"
            placeholder="Popov"
            value={surname.value}
            onChange={surname.onChange}
            onBlur={surname.onBlur}
            name="surname"
            valid={surname.isDirty && !surname.inputValid}
            required
          />
          {surname.isDirty && surname.inputError && (
            <p className={styles.error__message}>{surname.inputError}</p>
          )}
        </label>

        <label className={styles.form__item}>
          {t('cart_page.form.email')}
          <TextInput
            type="text"
            placeholder="topShop@gmail.com"
            value={email.value}
            onChange={email.onChange}
            onBlur={email.onBlur}
            name="email"
            required
            valid={email.isDirty && !email.inputValid}
          />
          {email.isDirty && email.inputError && (
            <p className={styles.error__message}>{email.inputError}</p>
          )}
        </label>

        <label className={styles.form__item}>
          {t('cart_page.form.address')}
          <TextInput
            type="text"
            placeholder="Walnut Grove 10"
            value={addres.value}
            onChange={addres.onChange}
            onBlur={addres.onBlur}
            name="addres"
            valid={addres.isDirty && !addres.inputValid}
            required
          />
          {addres.isDirty && addres.inputError && (
            <p className={styles.error__message}>{addres.inputError}</p>
          )}
        </label>

        <label className={styles.form__checkbox}>
          {t('cart_page.form.checkBox_message')}
          <CheckBox
            checked={consent}
            onChange={e => setConsent(e.target.checked)}
          />
        </label>

        {message && <p className={styles.message}>{message}</p>}

        <PrimaryButton disabled={formValid} type="submit">
          {t('cart_page.form.confirm_button')}
        </PrimaryButton>
        <PrimaryButton type="button" active={true} onClick={onCancel}>
          {t('cart_page.form.cancel_button')}
        </PrimaryButton>
      </form>
    </>
  );
};
