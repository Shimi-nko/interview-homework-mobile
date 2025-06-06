import type { CreateProductBodyRequest } from '@models/product';
import { WarehouseService } from '@service/warehouse.service';
import { Hono } from 'hono';

const warehouse = new Hono();

warehouse.post('', async (c) => {
  const body: CreateProductBodyRequest = await c.req.json();
  const product = await WarehouseService.createProduct(body);

  return c.json(product, 200);
});

warehouse.get('all', async (c) => {
  const products = await WarehouseService.getProducts();

  return c.json(products, 200);
});

export default warehouse;
