import { WarehouseService } from '@service/warehouse.service';
import { Hono } from 'hono';

const warehouse = new Hono();

warehouse.get('all', async (c) => {
  const products = await WarehouseService.getProducts();

  return c.json(products, 200);
});

export default warehouse;
