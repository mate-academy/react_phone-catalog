import type { Gadget } from '../../types/gadgets';
import type { TechSpecs } from '../../types/techSpecs';

export const helperToCreateTechSpecs = (gadget: Gadget): TechSpecs => {
  const { screen, resolution, processor, ram, capacity, cell, camera, zoom } =
    gadget;

  return { screen, resolution, processor, ram, capacity, cell, camera, zoom };
};
