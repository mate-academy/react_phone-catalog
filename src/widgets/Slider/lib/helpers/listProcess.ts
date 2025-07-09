import { BannerData } from '@entities/bannerSlide/model/bannerSlide';
import { BaseProduct } from '@shared/types/APITypes';
import { Mode } from '../../model/defaultConfig';

// TODO: clone number => props;

export function listCreate(
  dataset: BannerData[] | BaseProduct[],
  mode: Mode,
  clones: number,
) {
  let list = [];

  if (mode === Mode.CLAMP) {
    list = [...dataset];
  } else {
    const count = Math.min(clones, dataset.length);

    for (let i = count; i > 0; i--) {
      list.push({ ...dataset[dataset.length - i] });
    }

    list.push(...dataset.map(item => ({ ...item })));

    for (let i = 0; i < count; i++) {
      list.push({ ...dataset[i] });
    }
  }

  const renderList = list.map((item, idx) => ({ idx: idx, ...item }));

  return renderList;
}
