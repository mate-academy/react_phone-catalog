export function getSearchParam(
  name: string,
  params: URLSearchParams,

  options: [string, string][],
  defaultValue: string,
) {
  const param = params.get(name) || '';
  const foundOption = options.find(option => option[0] === param);

  return foundOption ? foundOption[1] : defaultValue;
}
