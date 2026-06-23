export const getColor = (color: string): string => {
  const normalized = color.trim().toLowerCase().replace(/[-\s]/g, '');
  const map: Record<string, string> = {
    midnight: '#1F1F1F',
    green: '#27AE60',
    yellow: '#F2C94C',
    white: '#F2F2F2',
    purple: '#BB6BD9',
    red: '#EB5757',
    blue: '#2F80ED',
    gold: '#F2C94C',
    silver: '#C0C0C0',
    spacegray: '#343d46',
    starlight: '#F5F5DC',
    midnightgreen: '#004953',
    graphite: '#474a50',
    coral: '#FF7F50',
    sierrablue: '#6C92A6',
    rosegold: '#B76E79',
    skyblue: '#87CEEB',
    pink: '#FFC0CB',
  };

  return map[normalized] || '#000';
};
