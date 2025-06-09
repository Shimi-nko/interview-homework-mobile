import { apiClient } from '@client/api-client';
import { expect } from '@jest/globals';

beforeAll(() => {
  //@ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve([]),
      text: () => Promise.resolve(),
    }),
  );
});

describe('apiClient', () => {
  it('should return data in json format', async () => {
    const response = await apiClient<[]>('http://amazingurl.com');
    expect(response).toStrictEqual([]);
  });

  it('should return data in text format', async () => {
    const spyFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce(
      //@ts-ignore
      {
        ok: true,
        status: 200,
        text: async () => 'amazing response',
      },
    );

    const response = await apiClient<string>(
      'http://amazingurl.com',
      undefined,
      'text',
    );
    expect(response).toStrictEqual('amazing response');

    spyFetch.mockReset();
    spyFetch.mockRestore();
  });

  it('should throw error when backend is down', async () => {
    const spyFetch = jest
      .spyOn(global, 'fetch')
      .mockRejectedValueOnce(new Error('API Error'));

    await expect(
      apiClient<string>('http://amazingurl.com', undefined),
    ).rejects.toThrow();

    spyFetch.mockReset();
    spyFetch.mockRestore();
  });

  it('should throw error when ok value is false', async () => {
    const spyFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce(
      //@ts-ignore
      { status: 400, ok: false },
    );

    await expect(
      apiClient<string>('http://amazingurl.com', undefined),
    ).rejects.toThrow();

    spyFetch.mockReset();
    spyFetch.mockRestore();
  });
});
