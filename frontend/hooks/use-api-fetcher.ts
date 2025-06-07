import type { ApiFetcherData } from '@customTypes/api-fetcher';
import { ApiFetcherActions, apiFetcherReducer } from '@reducers/api-fetcher';
import { useEffect, useReducer } from 'react';

export const useApiFetcher = <T>(fetchFunction: () => Promise<T>) => {
  const initialState: ApiFetcherData<T> = {
    loading: false,
  };

  const [state, dispatch] = useReducer(apiFetcherReducer<T>, initialState);

  const fetchData = async () => {
    dispatch({ type: ApiFetcherActions.FETCHING });

    try {
      const data = await fetchFunction();
      dispatch({ type: ApiFetcherActions.FETCH_SUCCESS, data });
    } catch (error) {
      dispatch({
        type: ApiFetcherActions.ERROR,
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect runs only once on mount
  useEffect(() => {
    fetchData().catch();
  }, []);

  return {
    ...state,
    refetch: fetchData,
  };
};
