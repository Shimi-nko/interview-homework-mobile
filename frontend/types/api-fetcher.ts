export type ApiFetcherData<T> = {
  loading: boolean;
  refetching: boolean;
  refetch: () => Promise<void>;
  error?: Error;
  data?: T;
};
