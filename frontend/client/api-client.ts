export const apiClient = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} url: ${url}`);
  }

  return (await response.json()) as T;
};
