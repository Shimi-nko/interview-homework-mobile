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

warehouse.delete(':id', async (c) => {
  const id = c.req.param('id');
  const deletedProduct = await WarehouseService.deleteProductById(id);

  return c.text(deletedProduct.id, 200);
});

export default warehouse;
