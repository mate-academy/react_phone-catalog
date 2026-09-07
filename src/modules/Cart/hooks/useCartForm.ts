import { useState } from 'react';
import { useInput } from '../../shared/hooks/useInput';

export const useCartForm = (
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
) => {
  const name = useInput('', { isEmpty: true, minLength: 4, maxLength: 15 });

  const surname = useInput('', { isEmpty: true, minLength: 4, maxLength: 15 });

  const email = useInput('', { isEmpty: true, isEmail: true });

  const addres = useInput('', { isEmpty: true });

  const [consent, setConsent] = useState<boolean>(true);

  const formValid = !(
    name.inputValid &&
    surname.inputValid &&
    email.inputValid &&
    addres.inputValid
  );

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(e);
  };

  return {
    name,
    surname,
    email,
    addres,
    consent,
    formValid,
    formSubmit,
    setConsent,
  };
};
