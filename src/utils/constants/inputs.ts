export type TInput = {
  id: string;
  type: string;
  placeholder: string;
  minLength?: number;
};

export const INPUTS_FORM: TInput[] = [
  {
    id: 'name',
    type: 'text',
    placeholder: 'name',
  },
  {
    id: 'email',
    type: 'email',
    placeholder: 'email',
  },
  {
    id: 'tel',
    type: 'tel',
    placeholder: 'number',
    minLength: 12,
  },
];
