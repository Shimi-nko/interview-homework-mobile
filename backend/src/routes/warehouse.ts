import type {
  CreateProductBodyRequest,
  UpdateProductBodyRequest,
} from '@models/product';
import { WarehouseService } from '@service/warehouse.service';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { Prisma } from 'prisma';

const warehouse = new Hono();

warehouse.post('', async (c, next) => {
  const body: CreateProductBodyRequest = await c.req.json();
  try {
    const product = await WarehouseService.createProduct(body);

    return c.json(product, 200);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new HTTPException(400, { message: error.message });
    }
    await next();
  }
});

warehouse.get('all', async (c) => {
  const products = await WarehouseService.getProducts();

  return c.json(products, 200);
});

warehouse.delete(':id', async (c, next) => {
  const id = c.req.param('id');
  try {
    const deletedProduct = await WarehouseService.deleteProductById(id);

    return c.text(deletedProduct.id, 200);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new HTTPException(400, { message: `Record for ${id} not found` });
    }
    await next();
  }
});

warehouse.patch(':id', async (c, next) => {
  const id = c.req.param('id');
  const body: UpdateProductBodyRequest = await c.req.json();

  try {
    const product = await WarehouseService.updateProductById(id, body);

    return c.json(product, 200);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new HTTPException(400, { message: error.message });
    }
    await next();
  }
});

export default warehouse;
