import { FormIDs } from './enums';

type ButtonProps = {
  title: string;
  form?: FormIDs;
};

type InputType = 'text' | 'email' | 'tel';

export { type ButtonProps, type InputType };
