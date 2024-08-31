import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const monster = new Hono();

monster.post(
  '/',
  zValidator(
    'form',
    z.object({
      body: z.string(),
    })
  ),
  (c) => {}
)

monster.get(
  '/',
  (c) => {
    return c.text('Hello Monsterdles !!');
  }
)

export default monster;
