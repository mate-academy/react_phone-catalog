const BASE_URL = import.meta.env.BASE_URL;

export async function client<T>(endpoint: string): Promise<T> {
  const response = await fetch(BASE_URL + endpoint);

  if (!response.ok) {
    // Lança um erro que pode ser capturado pelo .catch() no serviço ou componente
    throw new Error('Failed to fetch data');
  }

  // Converte a resposta para JSON
  return response.json();
}
