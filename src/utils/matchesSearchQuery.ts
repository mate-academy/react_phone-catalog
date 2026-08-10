export const matchesSearchQuery = (text: string, query: string) => {
  const normalizedText = text.toLowerCase();
  const queryWords = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  return queryWords.every(word => normalizedText.includes(word));
};
