export const BASE_URL = './api';

export async function request<T>(url: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}/${url}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Resource not found. Please check URL.');
      } else if (response.status >= 500) {
        throw new Error(`Server error! Status: ${response.status}`);
      } else if (response.status >= 400) {
        throw new Error(`Client error! Status: ${response.status}`);
      }
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network problem. Please check your connection and try again.');
    } else if (error instanceof SyntaxError) {
      throw new SyntaxError('Page not found. Please double-check the URL for accuracy.');
    }

    throw error;
  }
}
