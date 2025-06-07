export type WarehouseItem = {
  id: string;
  imageUrl?: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
};

export type CreateWarehouseItem = Omit<WarehouseItem, 'id'>;
