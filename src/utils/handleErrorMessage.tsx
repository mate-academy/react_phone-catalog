export const handleErrorMessage = (error: unknown, fallbackMessage: string) =>
  `${error instanceof Error ? error.message : fallbackMessage} Please try again later.`;
