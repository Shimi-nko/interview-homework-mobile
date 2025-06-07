export type ApiFetcherData<T> = {
  loading: boolean;
  refetch: () => Promise<void>;
  error?: Error;
  data?: T;
};
