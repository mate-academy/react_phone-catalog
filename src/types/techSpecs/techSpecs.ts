import type { Gadget } from '../gadgets';

export type TechSpecs = Pick<
  Gadget,
  | 'screen'
  | 'resolution'
  | 'processor'
  | 'ram'
  | 'capacity'
  | 'cell'
  | 'camera'
  | 'zoom'
>;
