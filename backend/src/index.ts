import { Hono } from 'hono';
import monster from './routes/monster'

const app = new Hono().basePath('/api/v1')

app.route('/monster', monster);

export default app

