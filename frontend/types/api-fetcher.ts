export type ApiFetcherData<T> = {
  loading: boolean;
  error?: Error;
  data?: T;
};
