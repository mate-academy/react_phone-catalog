import type { TFunction } from 'i18next';

const pluralize = (count: number, singular: string, t: TFunction) =>
  t(`time.${singular}`, { count });

export const formatListeningLength = (
  milliseconds: number,
  t: TFunction,
): string => {
  const totalMinutes = Math.floor(milliseconds / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const parts: string[] = [];

  if (hours > 0) parts.push(pluralize(hours, 'hour', t));
  if (minutes > 0) parts.push(pluralize(minutes, 'minute', t));

  return parts.length > 0 ? parts.join(' ') : t('time.zero');
};
