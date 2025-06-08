import warehouse from '@routes/warehouse';
import { Hono } from 'hono';
import { etag } from 'hono/etag';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

const app = new Hono();

app.use(etag());
app.use(logger());
app.use(prettyJSON({ space: 4 }));

app.route('', warehouse);

export default app;
