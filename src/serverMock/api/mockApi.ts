/* eslint-disable no-console */
import { isEntryPoint } from '@server/helpers';
import { apiFetch } from '@server/helpers/fetch';
import { prepareArray } from '@server/services/catalogService';
import { ApiEndpoint, type EntryPointValue } from '@server/static';
import { CatalogParams, TypeParam } from '@server/types/types';

const entryPointToEndpoint: Record<EntryPointValue, ApiEndpoint> = {
  cat: ApiEndpoint.PRODUCTS,
  phone: ApiEndpoint.PHONES,
  tab: ApiEndpoint.TABLETS,
  access: ApiEndpoint.ACCESSORIES,
  banner: ApiEndpoint.BANNERS,
} as const;

const entryTransform = (val: EntryPointValue) => {
  return entryPointToEndpoint[val];
};

//category works only for catalogues
export const upload = async (entryPoint: string) => {
  if (!isEntryPoint(entryPoint)) {
    console.warn('Unrecognized entry point:', entryPoint);
    throw new Error(`Invalid entry point: ${entryPoint}`);
  }

  const path = entryTransform(entryPoint);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[] = await apiFetch(path);

  return data;
};

export const uploadCatalogue = async (
  parameters: Partial<CatalogParams>,
  type?: TypeParam,
) => {
  const data = await upload('cat');

  const filtered = type ? data.filter(el => el.category === type) : data;
  const res = prepareArray(filtered, parameters);

  return res;
};
