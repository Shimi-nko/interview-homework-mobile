export const apiClient = async <T>(
  url: string,
  options?: RequestInit,
  type: 'json' | 'text' = 'json',
): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} url: ${url}`);
  }

  if (type === 'text') {
    return (await response.text()) as T;
  }

  return (await response.json()) as T;
};
