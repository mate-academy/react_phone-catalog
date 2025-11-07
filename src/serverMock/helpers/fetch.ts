import { ApiEndpoint, FetchDataTypesMap } from '@server/static/endPoints';
import { ErrorObject, Status } from '@server/types';
import { createError } from '.';

type FetchSuccess<M extends ApiEndpoint> = {
  status: Status.SUCCESS;
  data: FetchDataTypesMap[M];
};
export const apiFetch = async <M extends ApiEndpoint>(
  endpoint: M,
): Promise<FetchSuccess<M> | ErrorObject> => {
  try {
    const response = await window.fetch(endpoint);

    if (!response.ok) {
      return createError(500, 'Unexpected server error');
    }

    const data = await response.json();

    return { status: Status.SUCCESS, data: data };
  } catch (error) {
    return createError(500, 'Unexpected error while accessing the database');
  }
};
