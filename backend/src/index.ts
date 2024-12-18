import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

// Create the main Hono app
export const app = new Hono<{
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
  }
}>();

// Add CORS middleware
app.use('/*', cors());



// root route
app.get('/',(c)=>{
  return c.json({
    message: "Hello world"
  })
})


app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter);



export default app;
