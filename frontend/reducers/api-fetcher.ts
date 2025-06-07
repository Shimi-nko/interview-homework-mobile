import type { ApiFetcherData } from '@customTypes/api-fetcher';

export enum ApiFetcherActions {
  FETCHING = 'FETCHING',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  ERROR = 'ERROR',
}

type FetcherAction<T> = Partial<ApiFetcherData<T>> & {
  type: ApiFetcherActions;
};

export const apiFetcherReducer = <T>(
  state: ApiFetcherData<T>,
  action: FetcherAction<T>,
) => {
  switch (action.type) {
    case ApiFetcherActions.FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case ApiFetcherActions.FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    }
    case ApiFetcherActions.ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};
