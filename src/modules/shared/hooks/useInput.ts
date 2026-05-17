import { useMemo, useState } from 'react';
import { ValidationType } from '../types/ValidationType';
import { useValidation } from './useValidation';

export const useInput = (initialValue: string, validations: ValidationType) => {
  const [value, setValue] = useState<string>(initialValue);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const { inputValid, ...errors } = useValidation(value, validations);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setIsDirty(true);
  };

  const inputError = useMemo(() => {
    for (const key in errors) {
      if (errors[key as keyof typeof errors]) {
        return errors[key as keyof typeof errors];
      }
    }

    return null;
  }, [errors]);

  return { value, onBlur, onChange, isDirty, inputValid, inputError };
};
