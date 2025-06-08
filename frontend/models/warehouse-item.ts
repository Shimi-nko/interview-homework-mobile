export type WarehouseItem = {
  id: string;
  imageUrl?: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateWarehouseItem = Omit<
  WarehouseItem,
  'id' | 'createdAt' | 'updatedAt'
>;
