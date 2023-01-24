import { Ram } from './Ram';
import { Capacity } from './Capacity';

export type Specs = {
  [i: string]: string | Capacity | Ram;
};
