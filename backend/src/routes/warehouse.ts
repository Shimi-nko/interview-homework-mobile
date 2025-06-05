import { Hono } from 'hono';

const warehouse = new Hono();

warehouse.get('', (c) => {
  return c.text('welcome to warehouse API', 200);
});

export default warehouse;
