import type { ApiFetcherData } from '@customTypes/api-fetcher';
import { ApiFetcherActions, apiFetcherReducer } from '@reducers/api-fetcher';
import { useCallback, useEffect, useReducer } from 'react';

export const useApiFetcher = <T>(fetchFunction: () => Promise<T>) => {
  const initialState: ApiFetcherData<T> = {
    loading: false,
    refetching: false,
    refetch: () => Promise.resolve(),
  };

  const [state, dispatch] = useReducer(apiFetcherReducer<T>, initialState);

  const fetchData = useCallback(
    async (refetch?: boolean) => {
      const fetchingType = refetch
        ? ApiFetcherActions.REFETCHING
        : ApiFetcherActions.FETCHING;

      dispatch({
        type: fetchingType,
      });

      try {
        const data = await fetchFunction();
        dispatch({ type: ApiFetcherActions.FETCH_SUCCESS, data });

        refetch && dispatch({ type: ApiFetcherActions.REFETCHING_SUCCESS });
      } catch (error) {
        dispatch({
          type: ApiFetcherActions.ERROR,
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    },
    [fetchFunction],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect runs only once on mount
  useEffect(() => {
    fetchData().catch();
  }, []);

  return {
    ...state,
    refetch: () => fetchData(true),
  };
};
