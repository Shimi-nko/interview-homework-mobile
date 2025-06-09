import { apiClient } from '@client/api-client';
import { useApiFetcher } from '@hooks/use-api-fetcher';
import { expect } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react-native';

type MockData = { unique: string }[];

const MOCK_DATA: MockData = [{ unique: 'value' }, { unique: 'value' }];

beforeAll(() => {
  //@ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(MOCK_DATA),
    }),
  );
});

const mockApiCall = () => apiClient<[]>('http://amazingurl.com');

describe('useApiFetcher', () => {
  it('should fetch data with correct states changes', async () => {
    const { result } = renderHook(() => useApiFetcher<MockData>(mockApiCall));

    act(() => {
      expect(result.current.data).toBeUndefined();
      expect(result.current.loading).toBeTruthy();
      expect(result.current.error).toBeFalsy();
    });

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(MOCK_DATA);
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toBeUndefined();
    });
  });

  it('should set error when api is down', async () => {
    const error = new Error('API Error');
    const spyFetch = jest.spyOn(global, 'fetch').mockRejectedValueOnce(error);
    const { result } = renderHook(() => useApiFetcher<MockData>(mockApiCall));

    act(() => {
      expect(result.current.data).toBeUndefined();
      expect(result.current.loading).toBeTruthy();
      expect(result.current.error).toBeFalsy();
    });

    await waitFor(() => {
      expect(result.current.data).toBeUndefined();
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toStrictEqual(error);
    });

    spyFetch.mockReset();
    spyFetch.mockRestore();
  });

  it('should fetch data and refetch error, without changing data to undefined', async () => {
    const spyFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce(
      //@ts-ignore
      {
        ok: true,
        status: 200,
        json: async () => MOCK_DATA,
      },
    );

    const { result } = renderHook(() => useApiFetcher<MockData>(mockApiCall));

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(MOCK_DATA);
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toBeUndefined();
    });

    const error = new Error('API Error');
    const spyRejectFetch = jest
      .spyOn(global, 'fetch')
      .mockRejectedValueOnce(error);

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(MOCK_DATA);
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toStrictEqual(error);
    });

    spyFetch.mockReset();
    spyFetch.mockRestore();

    spyRejectFetch.mockReset();
    spyRejectFetch.mockRestore();
  });

  it('should update refetching prop after manual refetch', async () => {
    const spyFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce(
      //@ts-ignore
      {
        ok: true,
        status: 200,
        json: async () => MOCK_DATA,
      },
    );
    const { result } = renderHook(() => useApiFetcher<MockData>(mockApiCall));

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(MOCK_DATA);
      expect(result.current.loading).toBeFalsy();
      expect(result.current.refetching).toBeFalsy();
    });

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.refetching).toBeFalsy();
    });

    spyFetch.mockReset();
    spyFetch.mockRestore();
  });
});
