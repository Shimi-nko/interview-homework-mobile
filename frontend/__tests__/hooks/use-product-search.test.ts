import { useProductSearch } from '@hooks/use-product-search';
import { expect } from '@jest/globals';
import type { WarehouseItem } from '@models/warehouse-item';
import { act, renderHook } from '@testing-library/react-native';

const MOCK_PRODUCTS: WarehouseItem[] = [
  {
    id: 'test-id-1',
    name: 'test-name-1',
    description: 'test-description-1',
    price: 15,
    quantity: 1,
    createdAt: '2025-06-06T12:43:30.040Z',
    updatedAt: '2025-06-06T12:43:30.040Z',
  },
  {
    id: 'test-id-2',
    name: 'test-name-2',
    description: 'test-description-2',
    price: 150,
    quantity: 10,
    createdAt: '2025-06-06T12:43:30.040Z',
    updatedAt: '2025-06-06T12:43:30.040Z',
  },
  {
    id: 'test-id-3',
    name: 'test-name-3',
    description: 'test-description-3',
    price: 1500,
    quantity: 100,
    createdAt: '2025-06-06T12:43:30.040Z',
    updatedAt: '2025-06-06T12:43:30.040Z',
  },
  {
    id: 'test-id-4',
    name: 'test-name-4',
    description: 'test-description-4',
    price: 10,
    quantity: 4,
    createdAt: '2025-06-06T12:43:30.040Z',
    updatedAt: '2025-06-06T12:43:30.040Z',
  },
  {
    id: 'test-id-5',
    name: 'test-name-5',
    description: 'test-description-5',
    price: 3,
    quantity: 2,
    createdAt: '2025-06-06T12:43:30.040Z',
    updatedAt: '2025-06-06T12:43:30.040Z',
  },
  {
    id: 'test-id-6',
    name: 'something',
    description: 'not',
    price: 7,
    quantity: 8,
    createdAt: '2025-06-06T12:43:30.040Z',
    updatedAt: '2025-06-06T12:43:30.040Z',
  },
];

jest.mock('@context/warehouse-context', () => ({
  useWarehouse: () => ({
    data: MOCK_PRODUCTS,
  }),
}));

describe('useProductSearch', () => {
  it('should have undefined on init', () => {
    const { result } = renderHook(() => useProductSearch());

    expect(result.current.products).toBeUndefined();
  });

  it('should return all products which contain test-name', () => {
    const { result } = renderHook(() => useProductSearch());

    act(() => {
      result.current.search('test-name');
    });

    act(() => expect(result.current.products).toHaveLength(5));
  });

  it('should return exact product with name test-name-2', () => {
    const { result } = renderHook(() => useProductSearch());

    act(() => {
      result.current.search('test-name-2');
    });

    act(() =>
      expect(result.current.products).toStrictEqual([MOCK_PRODUCTS[1]]),
    );
  });

  it('should return all products which contain description', () => {
    const { result } = renderHook(() => useProductSearch());

    act(() => {
      result.current.search('description');
    });

    act(() => expect(result.current.products).toHaveLength(5));
  });

  it('should return exact product with description not', () => {
    const { result } = renderHook(() => useProductSearch());

    act(() => {
      result.current.search('not');
    });

    act(() =>
      expect(result.current.products).toStrictEqual([MOCK_PRODUCTS[5]]),
    );
  });

  it('should return all products which contain price 15', () => {
    const { result } = renderHook(() => useProductSearch());

    act(() => {
      result.current.search('15');
    });

    act(() => expect(result.current.products).toHaveLength(3));
  });

  it('should return exact product with price 1500', () => {
    const { result } = renderHook(() => useProductSearch());

    act(() => {
      result.current.search('1500');
    });

    act(() =>
      expect(result.current.products).toStrictEqual([MOCK_PRODUCTS[2]]),
    );
  });

  it('should return all products which contain quantity 10', () => {
    const { result } = renderHook(() => useProductSearch());

    act(() => {
      result.current.search('10');
    });

    act(() => expect(result.current.products).toHaveLength(3));
  });

  it('should return exact product with quantity price 8', () => {
    const { result } = renderHook(() => useProductSearch());

    act(() => {
      result.current.search('8');
    });

    act(() =>
      expect(result.current.products).toStrictEqual([MOCK_PRODUCTS[5]]),
    );
  });

  it('should return original data when search text is empty', () => {
    const { result } = renderHook(() => useProductSearch());
    act(() => {
      result.current.search('');
    });

    act(() =>
      expect(result.current.products).toHaveLength(MOCK_PRODUCTS.length),
    );
  });
});
