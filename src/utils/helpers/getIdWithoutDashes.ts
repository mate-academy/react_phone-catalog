export function getIdWithoutDashes(id: string) {
  return id.split('-').join('');
}
